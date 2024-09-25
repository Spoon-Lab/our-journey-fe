import s from './style.module.scss';

interface CoverHeaderProps {
  children: React.ReactNode;
  isScrolled: boolean;
  scrollPercent: number;
}

export default function ProgressBarHeader({ isScrolled, scrollPercent, children }: CoverHeaderProps) {
  return (
    <div className={`${s.coverHeader}  ${isScrolled ? s.fixed : ''}`}>
      {children}
      <div className={s.scrollIndicator}>
        <div className={s.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
    </div>
  );
}
