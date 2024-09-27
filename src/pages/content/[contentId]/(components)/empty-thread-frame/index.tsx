import WrapTags from '../wrap-tags';

import s from './style.module.scss';

export default function EmptyThreadFrame() {
  return (
    <div className={s.threadFrame}>
      <div className={s.threadHeader}>
        <div className={s.writerInfo}>
          <div className={s.writerIcon} />
          <div className={s.writerName}>test-writer</div>
        </div>
      </div>

      <div className={s.threadImage} />
      <div className={s.threadContent}>여행기를 작성해보세요!</div>
      <WrapTags tags={['tag']} />
    </div>
  );
}
