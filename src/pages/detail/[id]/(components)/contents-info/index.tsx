import s from './style.module.scss';

interface ContentsInfoProps {
  date: string;
  title: string;
  writer: string;
}

export default function ContentsInfo({ title, writer, date }: ContentsInfoProps) {
  return (
    <div className={s.contentsInfo}>
      <span className={s.date}>{date} MEMORY</span>
      <div className={s.titleFrame}>
        <div className={s.title}>{title}</div>
        <div className={s.wrapWriter}>
          <div className={s.profile} />
          <span className={s.writer}>{writer}</span>
        </div>
      </div>
    </div>
  );
}
