import s from './style.module.scss';

import { PrevIcon } from '@/assets/icons';
import BtnFrame from '@/pages/content/[contentId]/(components)/btn-frame';

interface EditHeaderProps {
  headerTitle: string;
  onClick?: () => void;
}

export default function EditHeader({ headerTitle, onClick }: EditHeaderProps) {
  return (
    <div className={s.header}>
      <BtnFrame onClick={onClick || (() => {})}>
        <PrevIcon height={24} className={s.prevIcon} />
      </BtnFrame>
      <p>{headerTitle}</p>
    </div>
  );
}
