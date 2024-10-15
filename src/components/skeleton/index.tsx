import s from './style.module.scss';

interface SkeletonProps {
  borderRadius?: string;
  height: string;
  width: string;
}

export default function Skeleton({ borderRadius = '4px', height, width }: SkeletonProps) {
  return <div className={s.skeleton} style={{ borderRadius, height, width }} />;
}
