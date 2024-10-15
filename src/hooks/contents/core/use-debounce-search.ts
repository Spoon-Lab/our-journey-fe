import { useCallback, useEffect, useState } from 'react';

function useDebounceSearch(initialValue: string = '', delay: number = 500) {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return {
    inputValue,
    debouncedValue,
    handleInputChange,
  };
}

export default useDebounceSearch;
