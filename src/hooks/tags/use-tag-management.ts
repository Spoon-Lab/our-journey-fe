// useTagManagement.ts
import { useCallback, useState } from 'react';

import type { Tag } from '@/types/tags';

import useCreateTag from './use-create-tag';

export function useTagManagement() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const createTagMutation = useCreateTag();

  const addTag = useCallback(
    async (tagName: string) => {
      const existingTag = tags.find((tag) => tag.tagName === tagName);
      if (existingTag) return;

      try {
        const result = await createTagMutation.mutateAsync({ body: { tagName } });
        setTags((prevTags) => [...prevTags, { tagId: result.tagId, tagName }]);
        console.log('Tag added:', { id: result.tagId, name: tagName });
      } catch (error) {
        console.error('Failed to create tag:', error);
      }
    },
    [tags, createTagMutation],
  );

  const removeTag = useCallback((tagName: string) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag.tagName !== tagName);
      console.log('Tags after removal:', newTags);
      return newTags;
    });
  }, []);

  return { tags, addTag, removeTag };
}
