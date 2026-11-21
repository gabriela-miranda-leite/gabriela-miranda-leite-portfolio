import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ZoomableImage } from './ZoomableImage';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { alt?: string }) =>
    values?.alt ? `${key}: ${values.alt}` : key,
}));

expect.extend(toHaveNoViolations);

const alt = 'Fluxograma da arquitetura';

beforeAll(() => {
  // jsdom has no PointerEvent, so coordinates and pointerId would be lost
  class TestPointerEvent extends MouseEvent {
    pointerId: number;
    constructor(type: string, init: MouseEventInit & { pointerId?: number } = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
    }
  }
  Object.defineProperty(window, 'PointerEvent', { configurable: true, value: TestPointerEvent });

  // jsdom has no <dialog> modal support
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open');
    // Browsers fire `close` asynchronously, after the current task
    setTimeout(() => this.dispatchEvent(new Event('close')), 0);
  };
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 400 });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 300 });
});

function open() {
  render(<ZoomableImage src="/posts/x/img.png" alt={alt} />);
  fireEvent.click(screen.getByRole('button', { name: `open_alt: ${alt}` }));
}

const lightboxImg = () => screen.getByRole('dialog').querySelector('img') as HTMLImageElement;
const scaleOf = (img: HTMLElement) => Number(/scale\(([\d.]+)\)/.exec(img.style.transform)?.[1]);
const translateOf = (img: HTMLElement) => {
  const m = /translate\((-?[\d.]+)px, (-?[\d.]+)px\)/.exec(img.style.transform);
  return { x: Number(m?.[1]), y: Number(m?.[2]) };
};

describe('ZoomableImage', () => {
  it('renders the image inside a button that names it', () => {
    render(<ZoomableImage src="/posts/x/img.png" alt={alt} />);

    expect(screen.getByRole('button', { name: `open_alt: ${alt}` })).toBeInTheDocument();
    expect(screen.getByAltText(alt)).toHaveAttribute('src', '/posts/x/img.png');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('uses a generic label for images without alt text', () => {
    render(<ZoomableImage src="/posts/x/img.png" alt="" />);
    expect(screen.getByRole('button', { name: 'open' })).toBeInTheDocument();
  });

  it('opens the lightbox on click and closes it with the close button', () => {
    open();
    expect(screen.getByRole('dialog', { name: alt })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays open under StrictMode, whose simulated unmount must not close it', async () => {
    render(
      <StrictMode>
        <ZoomableImage src="/posts/x/img.png" alt={alt} />
      </StrictMode>,
    );
    fireEvent.click(screen.getByRole('button', { name: `open_alt: ${alt}` }));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the lightbox outside the paragraph markdown wraps images in', () => {
    render(
      <p>
        <ZoomableImage src="/posts/x/img.png" alt={alt} />
      </p>,
    );
    fireEvent.click(screen.getByRole('button', { name: `open_alt: ${alt}` }));

    expect(screen.getByRole('dialog').closest('p')).toBeNull();
  });

  it('closes when the native dialog reports a close (Esc)', () => {
    open();
    fireEvent(screen.getByRole('dialog'), new Event('close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking the empty area around the image, but not the image', () => {
    open();
    fireEvent.click(lightboxImg());
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(lightboxImg().parentElement as HTMLElement);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('zooms with the buttons and resets', () => {
    open();
    expect(scaleOf(lightboxImg())).toBe(1);
    expect(screen.getByRole('button', { name: 'zoom_out' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'reset' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'zoom_in' }));
    expect(scaleOf(lightboxImg())).toBe(1.5);
    expect(screen.getByText('150%')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'reset' }));
    expect(scaleOf(lightboxImg())).toBe(1);
  });

  it('never zooms past the limits', () => {
    open();
    for (let i = 0; i < 10; i++) fireEvent.click(screen.getByRole('button', { name: 'zoom_in' }));

    expect(scaleOf(lightboxImg())).toBe(5);
    expect(screen.getByRole('button', { name: 'zoom_in' })).toBeDisabled();
  });

  it('supports keyboard zoom and reset', () => {
    open();
    const dialog = screen.getByRole('dialog');

    fireEvent.keyDown(dialog, { key: '+' });
    expect(scaleOf(lightboxImg())).toBe(1.5);
    fireEvent.keyDown(dialog, { key: '-' });
    expect(scaleOf(lightboxImg())).toBe(1);
    fireEvent.keyDown(dialog, { key: '=' });
    fireEvent.keyDown(dialog, { key: '0' });
    expect(scaleOf(lightboxImg())).toBe(1);
  });

  it('toggles zoom on double click', () => {
    open();
    fireEvent.doubleClick(lightboxImg(), { clientX: 0, clientY: 0 });
    expect(scaleOf(lightboxImg())).toBe(2);

    fireEvent.doubleClick(lightboxImg());
    expect(scaleOf(lightboxImg())).toBe(1);
  });

  it('pans with the keyboard only while zoomed, within the image bounds', () => {
    open();
    const dialog = screen.getByRole('dialog');

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(translateOf(lightboxImg())).toEqual({ x: 0, y: 0 });

    fireEvent.keyDown(dialog, { key: '+' });
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(translateOf(lightboxImg()).x).toBe(40);

    // At 1.5x a 400px-wide image can overflow by at most 100px per side
    for (let i = 0; i < 10; i++) fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(translateOf(lightboxImg()).x).toBe(100);
  });

  it('drags the zoomed image', () => {
    open();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: '+' });

    const img = lightboxImg();
    fireEvent.pointerDown(img, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(img, { pointerId: 1, clientX: 130, clientY: 90 });
    fireEvent.pointerUp(img, { pointerId: 1 });

    expect(translateOf(img)).toEqual({ x: 30, y: -10 });
  });

  it('does not close after a drag that ends on the backdrop area', () => {
    open();
    const img = lightboxImg();
    fireEvent.pointerDown(img, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(img, { pointerId: 1, clientX: 160, clientY: 100 });
    fireEvent.pointerUp(img, { pointerId: 1 });

    fireEvent.click(img.parentElement as HTMLElement);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has no accessibility violations (closed and open)', async () => {
    const { container } = render(<ZoomableImage src="/posts/x/img.png" alt={alt} />);
    expect(await axe(container)).toHaveNoViolations();

    fireEvent.click(screen.getByRole('button', { name: `open_alt: ${alt}` }));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
