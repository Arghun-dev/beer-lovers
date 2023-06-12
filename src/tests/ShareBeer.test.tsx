import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShareBeerPopover from 'components/ShareBeerPopover';

describe('ShareBeerPopover', () => {
  const testTitle = 'Test Beer';
  const testLink = 'https://test-beer-link.com';

  it('renders the ShareBeerPopover component', () => {
    render(
      <ShareBeerPopover title={testTitle} link={testLink}>
        <button>Share</button>
      </ShareBeerPopover>
    );

    const shareButton = screen.getByText('Share');
    act(() => {
      userEvent.click(shareButton);
    });

    expect(screen.getByTestId('share-popover-list')).toBeInTheDocument();
  });

  it('renders social sharing links', () => {
    render(
      <ShareBeerPopover title={testTitle} link={testLink}>
        <button>Share</button>
      </ShareBeerPopover>
    );

    const shareButton = screen.getByText('Share');
    act(() => {
      userEvent.click(shareButton);
    });

    const socialPlatforms = ['WhatsApp', 'Telegram', 'Twitter', 'Email'];

    socialPlatforms.forEach((platform) => {
      expect(screen.getByTestId(platform)).toBeInTheDocument();
    });
  });

  it('renders social sharing links with correct href', () => {
    render(
      <ShareBeerPopover title={testTitle} link={testLink}>
        <button>Share</button>
      </ShareBeerPopover>
    );

    const shareButton = screen.getByText('Share');
    act(() => {
      userEvent.click(shareButton);
    });

    const socialPlatforms = [
      {
        name: 'WhatsApp',
        expectedHref: `https://wa.me/?text=${encodeURIComponent(testLink)}`,
      },
      {
        name: 'Telegram',
        expectedHref: `https://t.me/share/url?url=${encodeURIComponent(
          testLink
        )}&text=${testTitle}`,
      },
      {
        name: 'Twitter',
        expectedHref: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          testLink
        )}`,
      },
      {
        name: 'Email',
        expectedHref: `mailto:?&subject=${testTitle}&body= I suggest to look into this beer: ${encodeURIComponent(
          testLink
        )} `,
      },
    ];

    socialPlatforms.forEach(({ name, expectedHref }) => {
      const linkElement = screen.getByTestId(name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', expectedHref);
    });
  });
});
