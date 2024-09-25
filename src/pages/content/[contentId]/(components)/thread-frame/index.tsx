import Image from 'next/image';

import { useModal } from '@/hooks/use-modal';

import ContentsDropdownActionMenu from '../dropdown-action-menu';
import ImageZoomedModal from '../image-zoomed-modal';
import WrapTags from '../wrap-tags';

import s from './style.module.scss';

import { MoreVertIcon } from '@/assets/icons';

interface ThreadFrameProps {
  date: string;
  image?: string;
  isWriter?: boolean;
  tags: string[];
  threadContent: string;
  writerIcon?: string;
  writerName: string;
}

export default function ThreadFrame({ date, isWriter = true, threadContent, writerName, writerIcon, tags, image }: ThreadFrameProps) {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

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
              { key: 'edit', name: '수정하기', onClick: () => {} },
              { key: 'delete', name: '삭제하기', onClick: () => {} },
            ]}
            triggerButton={<MoreVertIcon width={20} height={20} />}
          />
        )}
      </div>

      {image && (
        <div className={s.threadImage} onClick={() => openModal()}>
          <Image src={image} alt="thread-image" layout="fill" objectFit="cover" />
        </div>
      )}

      <div className={s.threadContent}>{threadContent}</div>
      <WrapTags tags={tags} />

      {isModalOpen && image && <ImageZoomedModal imageSrc={image} onClose={closeModal} />}
    </div>
  );
}
