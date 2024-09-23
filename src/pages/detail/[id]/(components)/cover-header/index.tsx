import BtnFrame from '../btn-frame';
import ContentsDropdownActionMenu from '../contents-dropdown-action-menu';

import s from './style.module.scss';

import { MoreVertIcon, PrevIcon } from '@/assets/icons';

interface CoverHeaderProps {
  isScrolled: boolean;
  scrollPercent: number;
}

export default function CoverHeader({ isScrolled, scrollPercent }: CoverHeaderProps) {
  return (
    <div className={`${s.coverHeader}  ${isScrolled ? s.fixed : ''}`}>
      <BtnFrame
        onClick={() => {
          window.history.back();
        }}
      >
        <PrevIcon alt="prev-btn" width={24} height={24} />
      </BtnFrame>
      <ContentsDropdownActionMenu
        triggerButton={<MoreVertIcon />}
        actionItems={[
          { name: '수정하기', onClick: () => {}, key: 'update' },
          { name: '삭제하기', onClick: () => {}, key: 'delete' },
        ]}
      />

      <div className={s.scrollIndicator}>
        <div className={s.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
    </div>
  );
}
