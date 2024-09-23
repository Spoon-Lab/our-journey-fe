import { useEffect, useRef } from 'react';

import { setInputWidth } from '@/utils/set-input-width';

interface UseDynamicInputProps {
  initialValue: string;
  onChange: (value: string) => void;
  onEnter: (value: string) => void;
  placeholder: string; // 매개변수를 받도록 수정
}
export function useDynamicInput({ initialValue, placeholder, onChange, onEnter }: UseDynamicInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current, placeholder);
    }
  }, [placeholder]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (inputRef.current) {
      setInputWidth(inputRef.current, e.target.value || placeholder);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value); // 현재 입력 값을 전달
    }
  };

  return {
    inputRef,
    inputProps: {
      ref: inputRef,
      type: 'text',
      placeholder,
      value: initialValue,
      onChange: handleInputChange,
      onKeyPress: handleKeyPress,
    },
  };
}
