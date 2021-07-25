import { css } from "@emotion/react";

type Props = {
  snsName: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel?: string;
};

export const SNSIcon = ({ snsName, href, icon, ariaLabel = "" }: Props) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} aria-label={ariaLabel}>
      <span css={spanStyle}>{snsName}</span>
      {icon}
    </a>
  );
};

// https://tailwindcss.com/docs/screen-readers
const spanStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
