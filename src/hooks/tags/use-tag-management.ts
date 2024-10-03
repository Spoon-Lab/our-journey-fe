import { useCallback, useState } from 'react';

import type { Tag } from '@/types/tags';

import useCreateTag from './use-create-tag';
import { useToast } from '../use-toast';

export function useTagManagement() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const createTagMutation = useCreateTag();
  const { addToast } = useToast();

  const addTag = useCallback(
    async (tagName: string, tagId?: number) => {
      // 입력값 검증
      if (!tagName.trim() || tagName.length > 40) {
        addToast('유효하지 않은 태그 이름입니다.', 'error');
        return;
      }

      const existingTag = tags.find((tag) => tag.tagName === tagName);
      if (existingTag) {
        addToast('이미 존재하는 태그입니다.', 'warning');
        return;
      }

      if (!tagId) {
        // 새로운 태그인 경우 서버에 요청
        try {
          const result = await createTagMutation.mutateAsync({ body: { tagName } });
          setTags((prevTags) => [...prevTags, { tagId: result.tagId, tagName }]);
          console.log('New tag added:', { id: result.tagId, name: tagName });
        } catch (error) {
          console.error('Error adding new tag:', error);

          if (error instanceof Error) {
            // 에러 타입에 따른 처리
            if (error.message.includes('Network Error')) {
              addToast('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.', 'error');
            } else if (error.message.includes('500')) {
              addToast('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
            } else {
              addToast(`태그 추가에 실패했습니다: ${error.message}`, 'error');
            }
          } else {
            addToast('알 수 없는 오류가 발생했습니다.', 'error');
          }
        }
      } else {
        // 제안된 태그를 선택한 경우 바로 리스트에 추가
        setTags((prevTags) => [...prevTags, { tagId, tagName }]);
        console.log('Suggested tag added:', { name: tagName });
      }
    },
    [tags, createTagMutation, addToast],
  );

  const removeTag = useCallback((tagName: string) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag.tagName !== tagName);
      return newTags;
    });
  }, []);

  return { tags, addTag, removeTag };
}
