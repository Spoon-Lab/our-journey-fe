import { useState } from 'react';
import router from 'next/router';

import type { Tag } from '@/types/threads';

import { checkLoggedIn } from '@/utils/check-logged-in';
import { copyUrlToClipboard } from '@/utils/copy-url-to-clipboard';

import { useAddLike } from '@/hooks/contents/use-add-like';
import { useRemoveLike } from '@/hooks/contents/use-remove-like';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/hooks/use-toast';

import Modal from '@/components/modal';

import BtnFrame from '../btn-frame';
import WrapTags from '../wrap-tags';

import s from './style.module.scss';

import { FavoriteIconFilled, FavoriteIconNoFill, LocationIcon, MessageIcon, ShareIcon } from '@/assets/icons';

interface ContentSectionProps {
  comments?: number;
  contentId: number;
  initialLiked: boolean;
  likes: number;
  period?: string;
  postContent?: string;
  tags: Tag[];
}

export default function ContentSection({ contentId, comments, initialLiked, likes, period, tags, postContent }: ContentSectionProps) {
  const { mutate: addLike } = useAddLike();
  const { mutate: removeLike } = useRemoveLike();
  const [isLiked, setLiked] = useState<boolean>(initialLiked);
  const { addToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();

  const handleLikeBtn = () => {
    if (!checkLoggedIn()) {
      openModal();
      return;
    }
    if (isLiked) {
      removeLike(contentId, {
        onSuccess: () => {
          setLiked(false);
          addToast('좋아요가 취소되었습니다.', 'info');
        },
        onError: () => {
          addToast('좋아요 취소에 실패했습니다.', 'error');
        },
      });
    } else {
      addLike(contentId, {
        onSuccess: () => {
          setLiked(true);
          addToast('좋아요가 등록되었습니다.', 'success');
        },
        onError: () => {
          addToast('좋아요 등록에 실패했습니다.', 'error');
        },
      });
    }
  };

  const handleShareClick = async () => {
    const success = await copyUrlToClipboard();
    if (success) {
      addToast('해당 콘텐츠의 url이 클립보드에 복사되었습니다!', 'info');
    } else {
      addToast('해당 콘텐츠의 url을 클립보드에 복사하는데 실패했습니다.', 'error');
    }
  };

  return (
    <section className={s.contentSection}>
      {isOpen && (
        <Modal
          text="로그인이 필요한 기능입니다."
          subText="로그인하시겠습니까?"
          leftBtnText="뒤로 가기"
          rightBtnText="로그인하기"
          leftBtnClick={closeModal}
          rightBtnClick={() => router.push('/login')}
        />
      )}
      {/* <div className={s.period}>
        <LocationIcon alt="location-icon" width={16} height={16} />
        <span>{period}</span>
      </div> */}
      {/* <p className={s.postContent}>{postContent}</p> */}
      <WrapTags tags={tags} />
      <div className={s.postActions}>
        <div className={s.wrapActions}>
          <BtnFrame onClick={handleLikeBtn}>
            {isLiked ? <FavoriteIconFilled alt="favorite-icon" width={18} height={18} /> : <FavoriteIconNoFill alt="favorite-icon" width={18} height={18} />}
          </BtnFrame>
          {/* <BtnFrame
            onClick={() => {
              console.log('clicked comments button!');
            }}
          >
            <MessageIcon alt="comments-icon" width={18} height={18} />
          </BtnFrame> */}
          <BtnFrame onClick={handleShareClick}>
            <ShareIcon alt="share-icon" width={18} height={18} />
          </BtnFrame>
        </div>
        <div className={s.wrapActionCounts}>
          <span>좋아요 {likes}</span>
          {/* <span>댓글 {comments}</span> */}
        </div>
      </div>
    </section>
  );
}
