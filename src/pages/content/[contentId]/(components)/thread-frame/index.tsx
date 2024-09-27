import Image from 'next/image';
import { useRouter } from 'next/router';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';
import { defaultFormatTimeStamp } from '@/utils/format-date-timestamp';

import { useDeleteThread } from '@/hooks/threads/use-delete-thread';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/hooks/use-toast';

import ContentsDropdownActionMenu from '../dropdown-action-menu';
import ImageZoomedModal from '../image-zoomed-modal';
import WrapTags from '../wrap-tags';

import s from './style.module.scss';

import { LocationIcon, MoreVertIcon } from '@/assets/icons';

interface ThreadFrameProps {
  contentId: number;
  date: string;
  image?: string;
  isWriter?: boolean;
  tags: string[];
  threadContent: string;
  threadId: number;
  writerIcon?: string;
  writerName: string;
}

export default function ThreadFrame({ isWriter = true, threadContent, writerName, writerIcon, tags, image, threadId, contentId, date }: ThreadFrameProps) {
  const router = useRouter();

  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const { addToast } = useToast();

  const { mutate: deleteThread } = useDeleteThread();

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

  return (
    <div className={s.threadFrame}>
      <div className={s.threadHeader}>
        <div className={s.writerInfo}>
          <div className={s.writerIcon}>{writerIcon && <Image src={writerIcon} alt="writer-icon" width={40} height={40} />}</div>
          <div className={s.writerName}>{writerName}</div>
        </div>
        {isWriter && (
          <ContentsDropdownActionMenu
            actionItems={[
              {
                key: 'edit',
                name: '수정하기',
                onClick: () => {
                  handleEdit();
                },
              },
              {
                key: 'delete',
                name: '삭제하기',
                onClick: () => {
                  handleDelete();
                },
              },
            ]}
            triggerButton={<MoreVertIcon width={20} height={20} />}
          />
        )}
      </div>

      {image && checkValidImgUrl(image) && (
        <div className={s.threadImage} onClick={() => openModal()}>
          <Image src={image} alt="thread-image" layout="fill" objectFit="cover" />
        </div>
      )}

      <div className={s.threadContent}>
        <div className={s.period}>
          <LocationIcon alt="location-icon" width={16} height={16} />
          <span>{defaultFormatTimeStamp(date)}</span>
        </div>
        {threadContent}
      </div>
      <WrapTags tags={tags} />

      {isModalOpen && image && <ImageZoomedModal imageSrc={image} onClose={closeModal} />}
    </div>
  );
}
