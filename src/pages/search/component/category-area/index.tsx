import s from './style.module.scss';

export default function CategoryArea() {
  return (
    <div style={{ width: '100%', padding: '0 16px' }}>
      <h3 className={s.categoryLabel}>카테고리</h3>
      <div className={s.categoryBox}>
        <button type="button" className={s.categoryButton}>
          국내 여행
        </button>
        <button type="button" className={s.categoryButton}>
          해외 여행
        </button>
      </div>
    </div>
  );
}
