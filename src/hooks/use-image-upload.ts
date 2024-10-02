import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useImagesUploadToLocal = () => {
  const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const acceptedFormats = useMemo(() => ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'], []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (acceptedFormats.includes(file.type)) {
        const format = file.type.split('/')[1];
        setUploadImageFile(file);
        setFileFormat(format);
        setErrorMessage(null);
      } else {
        setUploadImageFile(null);
        setFileFormat(null);
        setErrorMessage('Unsupported file format. Please upload PNG, JPG, JPEG, WEBP, or GIF.');
      }
    },
    [acceptedFormats],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => ({ ...acc, [format]: [] }), {}),
  });

  const resetImage = () => {
    setUploadImageFile(null);
  };

  return {
    uploadImageFile,
    fileFormat,
    getRootProps,
    getInputProps,
    isDragActive,
    resetImage,
    setUploadImageFile,
    errorMessage,
  };
};
