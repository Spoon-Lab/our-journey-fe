import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { Tag } from '@/types/threads';
import { TOAST_MESSAGE } from '@/constants/toast-message';

import { checkLoggedIn } from '@/utils/check-logged-in';
import { copyUrlToClipboard } from '@/utils/copy-url-to-clipboard';

import { useAddLike } from '@/hooks/contents/api/use-add-like';
import { useRemoveLike } from '@/hooks/contents/api/use-remove-like';
import { useModal } from '@/hooks/contents/ui/use-modal';
import { useToast } from '@/hooks/use-toast';

import Modal from '@/components/modal';

import BtnFrame from '../btn-frame';
import WrapTag from '../wrap-tag';

import s from './style.module.scss';

import { FavoriteIconFilled, FavoriteIconNoFill, ShareIcon } from '@/assets/icons';

interface ContentSectionProps {
  contentId: number;
  initialLiked: boolean;
  likes: number;
  tags: Tag[];
}

export default function ContentSection({ contentId, initialLiked, likes, tags }: ContentSectionProps) {
  const router = useRouter();
  const [isLiked, setLiked] = useState<boolean>(false);

  const { mutate: addLike } = useAddLike();
  const { mutate: removeLike } = useRemoveLike();
  const { addToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleLikeBtn = () => {
    if (!checkLoggedIn()) {
      openModal();
      return;
    }
    if (isLiked) {
      removeLike(contentId, {
        onSuccess: () => {
          router.reload();
        },
        onError: () => {
          addToast(TOAST_MESSAGE.LIKES.REMOVE.FAIL, 'error');
        },
      });
    } else {
      addLike(contentId, {
        onSuccess: () => {
          router.reload();
        },
        onError: () => {
          addToast(TOAST_MESSAGE.LIKES.ADD.FAIL, 'error');
        },
      });
    }
  };

  const handleShareClick = async () => {
    const success = await copyUrlToClipboard();
    if (success) {
      addToast(TOAST_MESSAGE.CLIP_BOARD.COPY.SUCCESS, 'info');
    } else {
      addToast(TOAST_MESSAGE.CLIP_BOARD.COPY.FAIL, 'error');
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
      <div className={s.wrapTags}>
        <div className={s.wrapTags}>{tags && tags.map((tag, idx) => <WrapTag key={idx} tag={tag.tagName} />)}</div>
      </div>
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
