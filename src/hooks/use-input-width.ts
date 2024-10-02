import { useCallback, useEffect, useRef } from 'react';

import { setInputWidth } from '@/utils/set-input-width';

interface UseDynamicInputProps {
  initialValue: string;
  onChange: (value: string) => void;
  onEnter: (value: string) => void;
  placeholder: string;
}

export function useDynamicInput({ initialValue, placeholder, onChange, onEnter }: UseDynamicInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const adjustWidth = useCallback(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current, inputRef.current.value || placeholder);
    }
  }, [placeholder]);

  useEffect(() => {
    adjustWidth();
  }, [adjustWidth, initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    adjustWidth();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value);
      adjustWidth();
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
    adjustWidth,
  };
}
