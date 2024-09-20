import type { ReactNode } from 'react';

import s from './style.module.scss';

import { ArrowBack } from '@/assets/icons';

interface ProfileHeaderProps {
  button?: ReactNode;
  iconClick?: () => void;
  text?: string;
}

export default function ProfileHeader({ text, button, iconClick }: ProfileHeaderProps) {
  return (
    <header className={s.headerContainer}>
      {iconClick ? (
        <button className={s.arrowBtn} type="button" onClick={iconClick}>
          <ArrowBack />
        </button>
      ) : (
        <div className={s.emptyBox} />
      )}
      <p>{text}</p>
      {button || <div className={s.emptyBox} />}
    </header>
  );
}
