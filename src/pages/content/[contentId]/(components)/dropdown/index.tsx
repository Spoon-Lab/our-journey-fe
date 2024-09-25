import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useDropdown } from '@/hooks/use-dropdown';

import s from './style.module.scss';

const dropdownAnimationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.05 },
};

interface DropdownProps {
  actionItems: React.ReactNode[];
  triggerButton: React.ReactNode;
}

export default function Dropdown({ triggerButton, actionItems }: DropdownProps) {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  return (
    <div className={s.dropdownContainer} ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className={s.triggerButton}>
        {triggerButton}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul className={s.dropdownList} {...dropdownAnimationConfig}>
            {actionItems}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
