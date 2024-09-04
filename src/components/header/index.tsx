import BELL from '@/assets/icons/Bell.svg';

import s from './style.module.scss';

export default function Header() {
  return (
    <header className={s.headerContainer}>
      <h1>logo</h1>
      <BELL />
    </header>
  );
}
