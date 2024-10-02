export const handleKeyboardNavigation = (key: string, currentIndex: number, maxIndex: number, onSelect: (index: number) => void, onEscape: () => void) => {
  switch (key) {
    case 'ArrowDown':
      onSelect(Math.min(currentIndex + 1, maxIndex));
      return true;
    case 'ArrowUp':
      onSelect(Math.max(currentIndex - 1, -1));
      return true;
    case 'Escape':
      onEscape();
      return true;
    default:
      return false;
  }
};
