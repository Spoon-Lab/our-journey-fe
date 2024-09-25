import { useDeleteContent } from '@/hooks/content/use-delete-content';

import BtnFrame from '../btn-frame';
import DropdownActionMenu from '../dropdown-action-menu';

import { MoreVertIcon, PrevIcon } from '@/assets/icons';

interface ContentHeaderProps {
  contentId: number;
}

export default function ContentHeader({ contentId }: ContentHeaderProps) {
  const deleteContentMutation = useDeleteContent();

  const handleDelete = () => {
    deleteContentMutation.mutate(contentId);
  };
  return (
    <>
      <BtnFrame
        onClick={() => {
          window.history.back();
        }}
      >
        <PrevIcon alt="prev-btn" width={24} height={24} />
      </BtnFrame>
      <DropdownActionMenu
        triggerButton={<MoreVertIcon />}
        actionItems={[
          { name: '수정하기', onClick: () => {}, key: 'update' },
          { name: '삭제하기', onClick: handleDelete, key: 'delete' },
        ]}
      />
    </>
  );
}
