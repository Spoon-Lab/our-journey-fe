import type { FormEventHandler } from 'react';
import { useEffect, useRef } from 'react';

import s from './style.module.scss';

interface CustomTextareaProps {
  invalidMsg?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

export default function CustomTextarea({ placeholder, value, onChange, invalidMsg, maxLength }: CustomTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const inputValue = (e.target as HTMLTextAreaElement).value;

    if (inputValue.match(/^\s+/)) {
      textarea.value = '';
      return;
    }

    if (maxLength && inputValue.length > maxLength) {
      return;
    }

    onChange(inputValue);
    adjustTextareaHeight();
  };

  const onBlur = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const trimmed = textarea.value.trim();
    onChange(trimmed);
    adjustTextareaHeight();
  };

  return (
    <div className={s.textareaWrapper}>
      <textarea
        className={invalidMsg ? s.invalid : ''}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onBlur={onBlur}
        ref={textareaRef}
        maxLength={maxLength}
      />
    </div>
  );
}
