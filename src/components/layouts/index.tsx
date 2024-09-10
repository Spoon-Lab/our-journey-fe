import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className={s.layoutContainer}>
      <main>{children}</main>
    </div>
  );
}
