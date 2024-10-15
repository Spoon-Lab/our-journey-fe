import s from './style.module.scss';

export default function Skeleton() {
  return (
    <>
      <div className={`${s.skeleton} ${s.skeletonImg}`} />
      <div className={s.userInfoWrapper}>
        <div className={s.skeleton} />
        <p className={s.skeleton} />
      </div>
    </>
  );
}
