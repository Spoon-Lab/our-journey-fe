import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useImageUpload = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const resetImage = () => {
    setImagePreview(null);
  };

  return {
    imagePreview,
    getRootProps,
    getInputProps,
    isDragActive,
    resetImage,
  };
};
