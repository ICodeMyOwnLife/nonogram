import React, { FC, memo } from 'react';

const SocialButtonsComponent: FC<SocialButtonsProps> = ({
  href,
  width = 400,
  layout = 'button',
  action = 'like',
  size = 'large',
  showFaces = true,
  share = true,
}) => {
  return (
    <div
      className="fb-like"
      data-href={href}
      data-width={width}
      data-layout={layout}
      data-action={action}
      data-size={size}
      data-show-faces={String(showFaces)}
      data-share={String(share)}
    />
  );
};

const SocialButtons = memo(SocialButtonsComponent);

export default SocialButtons;

export interface SocialButtonsProps {
  href: string;
  width?: number;
  layout?: 'standard' | 'box_count' | 'button_count' | 'button';
  action?: 'like' | 'recommend';
  size?: 'small' | 'large';
  showFaces?: boolean;
  share?: boolean;
}
