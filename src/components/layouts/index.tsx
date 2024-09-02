import Header from '../header';

import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: LayoutProps) {
  return (
    <div className={s.layoutContainer}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
