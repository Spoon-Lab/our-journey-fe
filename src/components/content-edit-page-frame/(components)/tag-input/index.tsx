import { useEffect, useState } from 'react';

import type { Tag } from '@/types/tags';

import useSearchTag from '@/hooks/tags/use-search-tag';
import { useDynamicInput } from '@/hooks/use-input-width';

import s from './style.module.scss';

interface TagInputProps {
  addTag: () => void;
  newTag: string;
  removeTag: (tag: string) => void;
  setNewTag: (value: string) => void;
  tags: string[];
}

export default function TagInput({ tags, newTag, setNewTag, addTag, removeTag }: TagInputProps) {
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { data: suggestedTags, isLoading, isSuccess } = useSearchTag(debouncedQuery);

  const { inputProps } = useDynamicInput({
    initialValue: newTag,
    placeholder: '#해시태그',
    onChange: (value) => {
      setNewTag(value);
      setSearchQuery([value]);
    },
    onEnter: addTag,
  });

  return (
    <div className={s.wrapTags}>
      {tags.map((tag, index) => (
        <span key={index} className={s.tag}>
          <button type="button" onClick={() => removeTag(tag)}>
            #{tag}
          </button>
        </span>
      ))}
      <input {...inputProps} maxLength={40} />

      {/* Display suggestions below the input */}
      <div className={s.suggestions}>
        {!isLoading &&
          isSuccess &&
          suggestedTags?.list.content.map((tag: Tag, index: number) => (
            <div key={index} onClick={() => setNewTag(tag.tagName)}>
              #{tag.tagName}
            </div>
          ))}
      </div>
    </div>
  );
}
