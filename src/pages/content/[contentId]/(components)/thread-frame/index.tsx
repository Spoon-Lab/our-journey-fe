import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import { defaultFormatTimeStamp } from '@/utils/format-date-timestamp';

import { useModal } from '@/hooks/contents/ui/use-modal';
import { useDeleteThread } from '@/hooks/threads/use-delete-thread';
import { useToast } from '@/hooks/use-toast';

import Skeleton from '@/components/skeleton';

import ContentsDropdownActionMenu from '../dropdown-action-menu';
import ImageZoomedModal from '../image-zoomed-modal';
import WrapTag from '../wrap-tag';

import s from './style.module.scss';

import { LocationIcon, MoreVertIcon } from '@/assets/icons';

interface ThreadFrameProps {
  contentId: number;
  date: string;
  image?: string;
  isLoading?: boolean;
  isWriter?: boolean;
  profileId: number;
  tags: string[];
  threadContent: string;
  threadId: number;
  writerIcon?: string;
  writerName: string;
}

export default function ThreadFrame({
  isWriter = true,
  threadContent,
  writerName,
  writerIcon,
  tags,
  image,
  threadId,
  contentId,
  date,
  profileId,
  isLoading = false,
}: ThreadFrameProps) {
  const router = useRouter();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const { addToast } = useToast();
  const { mutate: deleteThread } = useDeleteThread();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.src = image;
    } else {
      setImageLoaded(true);
    }
  }, [image]);

  const handleEdit = () => {
    void router.push(`/content/${contentId}/thread/${threadId}/edit`);
  };

  const handleDelete = () => {
    deleteThread(
      {
        threadId,
        contentId,
      },
      {
        onSuccess: () => {
          window.location.href = `/content/${contentId}`;
        },
        onError: () => {
          addToast('Thread 삭제를 실패하였습니다.', 'error');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className={s.threadFrame}>
        <div className={s.threadHeader}>
          <Skeleton width="150px" height="20px" />
          <Skeleton width="20px" height="20px" />
        </div>
        <Skeleton width="100%" height="200px" />
        <div className={s.threadContent}>
          <Skeleton width="100px" height="16px" />
          <Skeleton width="100%" height="60px" />
        </div>
        <div className={s.wrapTags}>
          <Skeleton width="60px" height="24px" />
          <Skeleton width="60px" height="24px" />
        </div>
      </div>
    );
  }

  return (
    <div className={s.threadFrame}>
      <div className={s.threadHeader}>
        <button className={s.writerInfo} type="button" onClick={() => router.push(ROUTES.otherProfile(profileId))} aria-label="프로필 보기">
          <div className={s.writerIcon}>{writerIcon && <Image src={writerIcon} alt="writer-icon" width={20} height={20} />}</div>
          <div className={s.writerName}>{writerName}</div>
        </button>
        {isWriter && (
          <ContentsDropdownActionMenu
            actionItems={[
              { key: 'edit', name: '수정하기', onClick: handleEdit },
              { key: 'delete', name: '삭제하기', onClick: handleDelete },
            ]}
            triggerButton={<MoreVertIcon width={20} height={20} />}
          />
        )}
      </div>

      {image && (
        <div className={s.threadImage} onClick={openModal}>
          {!imageLoaded && <Skeleton width="100%" height="100%" />}
          {imageLoaded && <Image src={image} alt="thread-image" layout="fill" objectFit="cover" />}
        </div>
      )}

      <div className={s.threadContent}>
        <div className={s.period}>
          <LocationIcon alt="location-icon" width={16} height={16} />
          <span>{defaultFormatTimeStamp(date)}</span>
        </div>
        {threadContent}
      </div>
      <div className={s.wrapTags}>{tags && tags.map((tag, idx) => tag && <WrapTag key={idx} tag={tag} />)}</div>
      {isModalOpen && image && <ImageZoomedModal imageSrc={image} onClose={closeModal} />}
    </div>
  );
}
