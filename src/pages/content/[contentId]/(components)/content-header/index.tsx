import React from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import { useDeleteContent } from '@/hooks/contents/use-delete-content';
import { useToast } from '@/hooks/use-toast';

import BtnFrame from '../btn-frame';
import DropdownActionMenu from '../dropdown-action-menu';

import { MoreVertIcon, PrevIcon } from '@/assets/icons';

interface ContentHeaderProps {
  contentId: number;
  isWriter: boolean;
}

export default function ContentHeader({ contentId, isWriter }: ContentHeaderProps) {
  const router = useRouter();
  const deleteContentMutation = useDeleteContent();
  const { addToast } = useToast();

  const handleEdit = () => {
    void router.push(`${ROUTES.content.edit(contentId)}`);
  };

  const handleDelete = () => {
    deleteContentMutation.mutate(contentId, {
      onSuccess: () => {
        void router.push(ROUTES.main);
        addToast('성공적으로 콘텐츠를 삭제하였습니다!', 'success');
      },
      onError: () => {
        addToast('콘텐츠 삭제를 실패하였습니다.', 'error');
      },
    });
  };
  return (
    <>
      <BtnFrame
        onClick={() => {
          void router.push('/main');
        }}
      >
        <PrevIcon alt="prev-btn" width={24} height={24} />
      </BtnFrame>
      {isWriter && (
        <DropdownActionMenu
          triggerButton={<MoreVertIcon width={24} height={24} />}
          actionItems={[
            { name: '수정하기', onClick: handleEdit, key: 'update' },
            { name: '삭제하기', onClick: handleDelete, key: 'delete' },
          ]}
        />
      )}
    </>
  );
}
