import type { ChangeEvent } from 'react';
import { useState } from 'react';

export const useFile = () => {
  const [file, setFile] = useState<FormData | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', selectedFile);

      setFile(formData);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  return {
    file,
    filePreview,
    handleChangeFile,
  };
};
