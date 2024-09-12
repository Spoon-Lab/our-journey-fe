import s from './style.module.scss';

export default function CurrentSearchArea() {
  return (
    <div className={s.currentSearchArea}>
      <div className={s.categoryBox}>
        <h3 className={s.categoryLabel}>최근에 검색하셨어요</h3>
        <button type="button" className={s.clearButton}>
          전체 삭제
        </button>
      </div>
      <div className={s.hashtagBox}>
        <button type="button" className={s.hashtagButton}>
          #제주도
        </button>
        <button type="button" className={s.hashtagButton}>
          #오사카
        </button>
        <button type="button" className={s.hashtagButton}>
          #다낭
        </button>
      </div>
    </div>
  );
}
