import { useState } from 'react';

type Categories = 1 | 2;

export const useSelectCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<Categories>(1);

  const toggleCategory = () => {
    setSelectedCategory(selectedCategory === 1 ? 2 : 1);
  };

  return {
    selectedCategory,
    toggleCategory,
  };
};
