import { useEffect, useState } from 'react';

import Dropdown from '../dropdown';

import s from './style.module.scss';

interface ActionItem {
  key: string;
  name: string;
  onClick: () => void;
}

interface ContentsDropdownActionMenuProps {
  actionItems: ActionItem[];
  triggerButton: React.ReactNode;
}

export default function ContentsDropdownActionMenu({ actionItems, triggerButton }: ContentsDropdownActionMenuProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown
      triggerButton={triggerButton}
      actionItems={actionItems.map(({ name, onClick, key }) => (
        <button type="button" key={key} className={s.dropdownActionButton} onClick={onClick}>
          {name}
        </button>
      ))}
    />
  );
}
