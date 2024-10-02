import { motion } from 'framer-motion';

import s from './style.module.scss';

interface SelectCategoriesToggleProps {
  selectedCategory: number;
  toggleCategory: () => void;
}

export default function SelectCategoriesToggle({ selectedCategory = 1, toggleCategory }: SelectCategoriesToggleProps) {
  return (
    <div className={s.selectCategoriesToggle} onClick={toggleCategory}>
      <motion.div
        className={s.slider}
        layout
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 70,
        }}
        animate={{
          left: selectedCategory === 1 ? '0%' : '50%',
        }}
      />
      <span className={`${s.category} ${selectedCategory === 1 ? s.active : ''}`}>국내 여행</span>
      <span className={`${s.category} ${selectedCategory === 2 ? s.active : ''}`}>해외 여행</span>
    </div>
  );
}
