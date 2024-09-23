import React from 'react';

import s from './style.module.scss';

interface DropZoneProps {
  children: React.ReactNode;
  getInputProps: () => object;
  getRootProps: () => object;
  hasImage: boolean;
  isDragActive: boolean;
}

export default function DropZone({ getRootProps, getInputProps, isDragActive, children, hasImage }: DropZoneProps) {
  return (
    <div {...getRootProps()} className={s.dropzone}>
      <input {...getInputProps()} />
      {!hasImage && (isDragActive ? <p>파일을 여기에 놓으세요...</p> : <p>파일을 드래그 앤 드롭하거나 클릭하여 선택하세요</p>)}
      {children}
    </div>
  );
}
