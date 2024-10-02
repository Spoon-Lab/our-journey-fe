import type { KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import type { Tag } from '@/types/tags';

import useSearchTag from '@/hooks/tags/use-search-tag';
import { useSuggestions } from '@/hooks/tags/use-suggestions';
import { useDynamicInput } from '@/hooks/use-input-width';

import s from './style.module.scss';

interface TagInputProps {
  addTag: (tagName: string) => void;
  removeTag: (tagName: string) => void;
  tags: Array<Tag>;
}

export default function TagInput({ addTag, removeTag, tags }: TagInputProps) {
  const [newTag, setNewTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: suggestedTags, isLoading, isSuccess } = useSearchTag(searchQuery);

  const { selectedIndex, showSuggestions, setShowSuggestions, handleKeyDown, resetSuggestions } = useSuggestions(suggestedTags?.list.content);

  const { inputProps, adjustWidth } = useDynamicInput({
    initialValue: newTag,
    placeholder: '#해시태그',
    onChange: (value) => {
      setNewTag(value);
      setSearchQuery(value);
      setShowSuggestions(true);
    },
    onEnter: () => {
      if (newTag.trim()) {
        void addTag(newTag.trim());
        setNewTag('');
        resetSuggestions();
      }
    },
  });

  useEffect(() => {
    if (typeof adjustWidth === 'function') {
      adjustWidth();
    }
  }, [newTag, adjustWidth]);

  const handleSuggestionClick = (tagName: string) => {
    void addTag(tagName);
    setNewTag('');
    resetSuggestions();
    if (typeof adjustWidth === 'function') {
      adjustWidth();
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (handleKeyDown(e)) {
      e.preventDefault();
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedTag = suggestedTags?.list.content[selectedIndex];
      if (selectedTag) {
        void addTag(selectedTag.tagName);
        setNewTag('');
        resetSuggestions();
        if (typeof adjustWidth === 'function') {
          adjustWidth();
        }
      }
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => resetSuggestions(), 200);
  };

  return (
    <div className={s.tagInput}>
      {tags.map((tag) => (
        <span key={tag.tagId} className={s.tag}>
          <button type="button" onClick={() => removeTag(tag.tagName)}>
            #{tag.tagName}
          </button>
        </span>
      ))}
      <div className={s.wrapTagInput}>
        <input {...inputProps} maxLength={40} onKeyDown={handleInputKeyDown} onBlur={handleInputBlur} onFocus={() => setShowSuggestions(true)} />
        {showSuggestions && (
          <div className={s.suggestions}>
            {!isLoading &&
              isSuccess &&
              suggestedTags?.list.content.map((tag: Tag, index: number) => (
                <button type="button" key={index} onClick={() => handleSuggestionClick(tag.tagName)} className={index === selectedIndex ? s.selected : ''}>
                  {tag.tagName}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
