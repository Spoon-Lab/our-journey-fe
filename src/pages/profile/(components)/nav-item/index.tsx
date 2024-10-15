import type { ReactNode } from 'react';

import s from './style.module.scss';

interface NavItemProps {
  disabled?: boolean;
  leftIcon: ReactNode;
  onClick?: () => void;
  rightIcon?: ReactNode;
  text: string;
}

export default function NavItem({ leftIcon, text, rightIcon, onClick, disabled }: NavItemProps) {
  return (
    <div className={s.navItemContainer}>
      <div className={s.navInfoWrapper}>
        {leftIcon}
        <p>{text}</p>
      </div>
      <button type="button" onClick={onClick} disabled={disabled}>
        {rightIcon}
      </button>
    </div>
  );
}
