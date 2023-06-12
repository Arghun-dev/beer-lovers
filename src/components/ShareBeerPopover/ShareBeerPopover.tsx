import { Popover } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';

import style from './ShareBeerPopover.module.scss';

interface ShareBeerPopoverProps {
  children: React.ReactNode;
  title: string;
  link: string;
  placement?: TooltipPlacement;
}

interface SocialLinkProps {
  name: string;
  link: string;
  icon: string;
}

const SocialLink = ({ name, link, icon }: SocialLinkProps) => (
  <li>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
      data-testid={name}
    >
      <img src={icon} alt={name} /> {name}
    </a>
  </li>
);

const socialLinks = (encodedLink: string, title: string) => ({
  WhatsApp: {
    link: `https://wa.me/?text=${encodedLink}`,
    icon: '/images/icons/WhatsApp.svg',
  },
  Telegram: {
    link: `https://t.me/share/url?url=${encodedLink}&text=${title}`,
    icon: '/images/icons/telegram.svg',
  },
  Twitter: {
    link: `https://twitter.com/intent/tweet?url=${encodedLink}`,
    icon: '/images/icons/Twitter.svg',
  },
  Email: {
    link: `mailto:?&subject=${title}&body= I suggest to look into this beer: ${encodedLink} `,
    icon: '/images/icons/email.svg',
  },
});

const ShareBeerPopover = ({
  children,
  title,
  link,
  placement = 'leftTop',
}: ShareBeerPopoverProps) => {
  const encodedLink = encodeURIComponent(link);
  const linksData = socialLinks(encodedLink, title);

  const links = (
    <ul className={style.socialLink} data-testid="share-popover-list">
      {Object.entries(linksData).map(([key, { link, icon }]) => (
        <SocialLink key={key} name={key} link={link} icon={icon} />
      ))}
    </ul>
  );

  return (
    <Popover placement={placement} content={links} trigger="click">
      {children}
    </Popover>
  );
};

export default ShareBeerPopover;
