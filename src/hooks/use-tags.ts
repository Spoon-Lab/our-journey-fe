import { useCallback, useState } from 'react';

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleNewTagChange = useCallback((value: string) => {
    // 스페이스를 언더바로 치환
    const replacedValue = value.replace(/\s/g, '_');
    setNewTag(replacedValue);
  }, []);

  const addTag = useCallback(() => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  }, []);

  return { tags, newTag, setNewTag: handleNewTagChange, addTag, removeTag, setTags };
};
