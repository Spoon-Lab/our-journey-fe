import type { HTMLAttributes } from 'react';

import s from './style.module.scss';

import { ArrowBackIcon } from '@/assets/icons/icons';

interface InterfaceProp extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function Header(props: InterfaceProp) {
  const { title } = props;

  return (
    <header className={s.headerContainer}>
      <div className={s.backButtonBox}>
        <button aria-label="뒤로" type="button" className={s.backButton}>
          <ArrowBackIcon />
        </button>
        <h1 className={s.headerTitle}>{title}</h1>
      </div>
    </header>
  );
}
