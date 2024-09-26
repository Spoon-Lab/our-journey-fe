import s from './style.module.scss';

import { PrevIcon } from '@/assets/icons';
import BtnFrame from '@/pages/content/[contentId]/(components)/btn-frame';

interface EditHeaderProps {
  onClick?: () => void;
  titleText: string;
}

export default function EditHeader({ titleText, onClick }: EditHeaderProps) {
  return (
    <div className={s.header}>
      <BtnFrame onClick={onClick || (() => {})}>
        <PrevIcon height={24} className={s.prevIcon} />
      </BtnFrame>
      <p>{titleText}</p>
    </div>
  );
}
