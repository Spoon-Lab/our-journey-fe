import { pre } from 'framer-motion/client';

import s from './style.module.scss';

import { PrevIcon } from '@/assets/icons';
import BtnFrame from '@/pages/test/detail/[id]/(components)/btn-frame';

interface HeaderProps {
  headerTitle: string;
  isCoWorker?: boolean;
  setCoWorker: (value: boolean) => void;
}

export default function Header({ headerTitle, setCoWorker, isCoWorker }: HeaderProps) {
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
