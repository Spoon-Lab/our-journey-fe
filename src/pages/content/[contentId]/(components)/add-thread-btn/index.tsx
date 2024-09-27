import router from 'next/router';

import s from './style.module.scss';

import { AddIcon } from '@/assets/icons';

export default function AddThreadBtn({ contentId }: { contentId: number }) {
  return (
    <div className={s.addThreadBtn} onClick={() => router.push(`/content/${contentId}/thread/create`)}>
      <AddIcon width={32} height={32} />
      <span className={s.text1}>여행 타래를 작성해볼까요?</span>
      <span className={s.text2}>이야기를 공유해보세요!</span>
    </div>
  );
}
