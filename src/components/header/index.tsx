import Image from 'next/image';

import BELL_SVG from '@/assets/images/Bell.svg';

import s from './style.module.scss';

export default function Header() {
  return (
    <header className={s.headerContainer}>
      <h1>logo</h1>
      <Image src={BELL_SVG} alt="bell" width={20} />
    </header>
  );
}
