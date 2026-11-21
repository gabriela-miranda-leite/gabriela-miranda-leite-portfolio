import { renderToString } from 'react-dom/server';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VideoEmbed } from './VideoEmbed';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) =>
    values ? `${key}:${Object.values(values).join('/')}` : key,
}));

expect.extend(toHaveNoViolations);

const caption = 'Demonstração da aba de Mocks';

beforeAll(() => {
  HTMLMediaElement.prototype.play = jest.fn(function play(this: HTMLMediaElement) {
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  });
  HTMLMediaElement.prototype.pause = jest.fn(function pause(this: HTMLMediaElement) {
    this.dispatchEvent(new Event('pause'));
  });
});

const videoOf = (container: HTMLElement) => container.querySelector('video') as HTMLVideoElement;

function withDuration(video: HTMLVideoElement, seconds: number) {
  Object.defineProperty(video, 'duration', { configurable: true, value: seconds });
  fireEvent(video, new Event('durationchange'));
}

describe('VideoEmbed', () => {
  it('ships the browser controls in the server HTML so it works without JS', () => {
    const html = renderToString(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);

    expect(html).toContain('controls');
    expect(html).not.toContain('video-embed-controls');
  });

  it('swaps in the blog controls once on the client, without autoplay', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    const video = videoOf(container);

    expect(video).not.toHaveAttribute('controls');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).not.toHaveAttribute('aria-label');
    expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument();
    expect(screen.getByText(caption, { selector: 'figcaption' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'controls' })).toBeInTheDocument();
  });

  it.each([
    ['/posts/demo.mp4', 'video/mp4'],
    ['/posts/demo.webm', 'video/webm'],
  ])('infers the source type from %s', (src, type) => {
    const { container } = render(<VideoEmbed src={src} caption={caption} />);
    const source = container.querySelector('source');

    expect(source).toHaveAttribute('src', src);
    expect(source).toHaveAttribute('type', type);
  });

  it('adds the landscape modifier only when requested', () => {
    const { container, rerender } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    expect(container.querySelector('figure')).not.toHaveClass('video-embed--landscape');

    rerender(<VideoEmbed src="/posts/demo.mp4" caption={caption} landscape />);
    expect(container.querySelector('figure')).toHaveClass('video-embed--landscape');
  });

  it('toggles play and pause with a button whose name follows the state', () => {
    render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);

    fireEvent.click(screen.getByRole('button', { name: 'play' }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'pause' }));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'play' })).toBeInTheDocument();
  });

  it('toggles playback when clicking the video itself', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);

    fireEvent.click(videoOf(container));
    expect(screen.getByRole('button', { name: 'pause' })).toBeInTheDocument();
  });

  it('exposes progress as a slider with a readable value, disabled until the duration is known', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    expect(screen.getByRole('slider', { name: 'seek' })).toBeDisabled();

    withDuration(videoOf(container), 90);
    const slider = screen.getByRole('slider', { name: 'seek' });

    expect(slider).toBeEnabled();
    expect(slider).toHaveAttribute('max', '90');
    expect(slider).toHaveAttribute('aria-valuetext', 'seek_value:0:00/1:30');
  });

  it('seeks when the slider changes', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    const video = videoOf(container);
    let current = 0;
    Object.defineProperty(video, 'currentTime', {
      configurable: true,
      get: () => current,
      set: (v: number) => {
        current = v;
      },
    });
    withDuration(video, 90);

    fireEvent.change(screen.getByRole('slider', { name: 'seek' }), { target: { value: '30' } });

    expect(current).toBe(30);
    expect(screen.getByRole('slider', { name: 'seek' })).toHaveAttribute('aria-valuetext', 'seek_value:0:30/1:30');
  });

  it('changes the playback speed with a native select', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);

    fireEvent.change(screen.getByRole('combobox', { name: 'speed' }), { target: { value: '1.5' } });

    expect(videoOf(container).playbackRate).toBe(1.5);
  });

  it('goes fullscreen on the video itself and hands over to the native controls', async () => {
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
    let fullscreenElement: Element | null = null;
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => fullscreenElement });
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    const video = videoOf(container);
    video.requestFullscreen = jest.fn(async () => {
      fullscreenElement = video;
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(video).not.toHaveAttribute('controls');
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'fullscreen' }));
    });

    expect(video.requestFullscreen).toHaveBeenCalled();
    expect(video).toHaveAttribute('controls');
    expect(screen.getByRole('button', { name: 'exit_fullscreen' })).toBeInTheDocument();

    // Native controls own clicks while fullscreen, so the click shortcut must stay out of the way
    fireEvent.click(video);
    expect(screen.getByRole('button', { name: 'exit_fullscreen' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'pause' })).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    withDuration(videoOf(container), 90);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations while playing', async () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    fireEvent.click(screen.getByRole('button', { name: 'play' }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
