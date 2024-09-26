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
  const { inputProps } = useDynamicInput({
    initialValue: newTag,
    placeholder: '#해시태그',
    onChange: setNewTag,
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
      <input {...inputProps} />
    </div>
  );
}
