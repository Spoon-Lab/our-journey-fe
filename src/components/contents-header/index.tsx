import s from './style.module.scss';

import { PrevIcon } from '@/assets/icons';
import BtnFrame from '@/pages/detail/[id]/(components)/btn-frame';

interface ContentsHeaderProps {
  headerTitle: string;
  isCoWorker?: boolean;
  setCoWorker: (value: boolean) => void;
}

export default function ContentsHeader({ headerTitle, setCoWorker, isCoWorker }: ContentsHeaderProps) {
  return (
    <div className={s.header}>
      <BtnFrame
        onClick={() => {
          setCoWorker(!isCoWorker);
        }}
      >
        <PrevIcon height={24} className={s.prevIcon} />
      </BtnFrame>
      <p>{headerTitle}</p>
    </div>
  );
}
