import s from './style.module.scss';

import { BellIcon } from '@/assets/icons/icons';

export default function Header() {
  return (
    <header className={s.headerContainer}>
      <h1>logo</h1>
      <BellIcon />
    </header>
  );
}
