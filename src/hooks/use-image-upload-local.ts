import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useImagesUploadToLocal = () => {
  const [uploadImageFile, setUploadImageFile] = useState<File | string>('');
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const acceptedFormats = useMemo(() => ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'], []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (acceptedFormats.includes(file.type)) {
          const format = file.type.split('/')[1];
          setUploadImageFile(file);
          setFileFormat(format);
          setErrorMessage(null);
        } else {
          setUploadImageFile('');
          setFileFormat(null);
          setErrorMessage('지원되지 않는 파일 형식입니다. PNG, JPG, JPEG, WEBP 또는 GIF 파일을 업로드해 주세요.');
        }
      }
    },
    [acceptedFormats],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => ({ ...acc, [format]: [] }), {}),
    multiple: false, // 여기에 multiple: false 옵션 추가
    maxFiles: 1, // 최대 파일 수를 1로 제한
  });

  const resetImage = () => {
    setUploadImageFile('');
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
