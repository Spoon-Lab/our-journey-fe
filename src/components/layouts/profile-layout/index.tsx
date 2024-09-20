import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: LayoutProps) {
  return <div className={s.layoutContainer}>{children}</div>;
}
