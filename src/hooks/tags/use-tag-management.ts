import { useState } from 'react';

import type { Tag } from '@/types/tags';

import useCreateTag from './use-create-tag';

export function useTagManagement() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const createTagMutation = useCreateTag();

  const addTag = async (tagName: string, existingTagId?: number) => {
    const existingTag = tags.find((tag) => tag.tagName === tagName);
    if (existingTag) {
      return;
    }

    if (existingTagId) {
      setTags((prevTags) => [...prevTags, { tagId: existingTagId, tagName }]);
    } else {
      try {
        const result = await createTagMutation.mutateAsync({ body: { tagName } });
        setTags((prevTags) => [...prevTags, { tagId: result.tagId, tagName }]);
      } catch (error) {
        console.error('Failed to create tag:', error);
      }
    }
  };

  const removeTag = (tagName: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.tagName !== tagName));
  };

  return { tags, addTag, removeTag };
}
