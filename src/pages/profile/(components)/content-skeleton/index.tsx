import s from './style.module.scss';

export default function ContentSkeleton() {
  return (
    <div className={s.container}>
      <div className={s.image} />
      <div className={s.contentWrapper}>
        <div className={s.title} />
        <div className={s.date} />
      </div>
    </div>
  );
}
