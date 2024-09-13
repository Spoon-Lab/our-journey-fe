import Image from 'next/image';

import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className={s.layoutContainer}>
      <Image className={s.backgroundIcon} src="/images/yellowImg.png" width={180} height={100} alt="yellow-img" priority />
      {children}
    </div>
  );
}
