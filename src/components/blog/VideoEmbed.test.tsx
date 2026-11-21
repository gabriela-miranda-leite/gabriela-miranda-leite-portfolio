import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VideoEmbed } from './VideoEmbed';

expect.extend(toHaveNoViolations);

const caption = 'Demonstração da aba de Mocks';

describe('VideoEmbed', () => {
  it('renders a captioned video with controls and no autoplay', () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    const video = container.querySelector('video');

    expect(screen.getByText(caption, { selector: 'figcaption' })).toBeInTheDocument();
    expect(video).toHaveAttribute('aria-label', caption);
    expect(video).toHaveAttribute('controls');
    expect(video).not.toHaveAttribute('autoplay');
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

  it('has no accessibility violations', async () => {
    const { container } = render(<VideoEmbed src="/posts/demo.mp4" caption={caption} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
