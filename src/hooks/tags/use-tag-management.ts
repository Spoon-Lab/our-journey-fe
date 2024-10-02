// useTagManagement.ts
import { useCallback, useState } from 'react';

import type { Tag } from '@/types/tags';

import useCreateTag from './use-create-tag';
import { useToast } from '../use-toast';

export function useTagManagement() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const createTagMutation = useCreateTag();
  const { addToast } = useToast();

  const addTag = useCallback(
    async (tagName: string) => {
      const existingTag = tags.find((tag) => tag.tagName === tagName);
      if (existingTag) return;

      try {
        const result = await createTagMutation.mutateAsync({ body: { tagName } });
        setTags((prevTags) => [...prevTags, { tagId: result.tagId, tagName }]);
        console.log('Tag added:', { id: result.tagId, name: tagName });
      } catch (error) {
        addToast('태그 추가에 실패하였습니다.', 'error');
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
