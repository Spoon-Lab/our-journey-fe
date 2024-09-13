import type { HTMLAttributes } from 'react';
import { useRouter } from 'next/router';

import s from './style.module.scss';

import { ArrowBackIcon } from '@/assets/icons/icons';

interface InterfaceProp extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function Header(props: InterfaceProp) {
  const { title } = props;
  const router = useRouter();

  const handleMoveToBack = () => router.back();

  return (
    <header className={s.headerContainer}>
      <div className={s.backButtonBox}>
        <button aria-label="뒤로" type="button" className={s.backButton} onClick={handleMoveToBack}>
          <ArrowBackIcon />
        </button>
        <h1 className={s.headerTitle}>{title}</h1>
      </div>
    </header>
  );
}
