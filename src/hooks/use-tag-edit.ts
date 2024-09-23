import { useState } from 'react';

export function useTagEdit() {
  const [editingTag, setEditingTag] = useState<string | null>(null);

  const startEditing = (tag: string) => {
    setEditingTag(tag);
  };

  const stopEditing = () => {
    setEditingTag(null);
  };

  return { editingTag, startEditing, stopEditing };
}
