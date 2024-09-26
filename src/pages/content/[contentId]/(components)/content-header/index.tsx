import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import { useDeleteContent } from '@/hooks/contents/use-delete-content';
import { useToast } from '@/hooks/use-toast';

import BtnFrame from '../btn-frame';
import DropdownActionMenu from '../dropdown-action-menu';

import { MoreVertIcon, PrevIcon } from '@/assets/icons';

interface ContentHeaderProps {
  contentId: number;
}

export default function ContentHeader({ contentId }: ContentHeaderProps) {
  const router = useRouter();
  const deleteContentMutation = useDeleteContent();
  const { addToast } = useToast();

  const handleEdit = () => {
    void router.push(`${ROUTES.content.edit(contentId)}`);
  };

  const handleDelete = () => {
    deleteContentMutation.mutate(contentId, {
      onSuccess: () => {
        addToast('삭제 성공', 'success');
      },
      onError: () => {
        addToast('삭제 실패', 'error');
      },
    });
    void router.push(ROUTES.main);
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
          { name: '수정하기', onClick: handleEdit, key: 'update' },
          { name: '삭제하기', onClick: handleDelete, key: 'delete' },
        ]}
      />
    </>
  );
}
