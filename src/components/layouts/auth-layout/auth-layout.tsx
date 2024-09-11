import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className={s.layoutContainer}>
      <div className={s.mainContainer}>{children}</div>
    </div>
  );
}
