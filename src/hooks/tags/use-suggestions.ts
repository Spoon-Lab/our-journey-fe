import { useCallback, useState } from 'react';

import type { Tag } from '@/types/tags';

import { handleKeyboardNavigation } from '@/utils/keyboard-nav';

export const useSuggestions = (suggestedTags: Tag[] | undefined) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!suggestedTags?.length) return false;

      return handleKeyboardNavigation(e.key, selectedIndex, suggestedTags.length - 1, setSelectedIndex, () => setShowSuggestions(false));
    },
    [suggestedTags, selectedIndex],
  );

  const resetSuggestions = useCallback(() => {
    setSelectedIndex(-1);
    setShowSuggestions(false);
  }, []);

  return {
    selectedIndex,
    showSuggestions,
    setShowSuggestions,
    handleKeyDown,
    resetSuggestions,
  };
};
