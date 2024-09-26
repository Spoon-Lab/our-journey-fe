import { useEffect, useState } from 'react';

import { useImageUpload } from '@/hooks/use-image-upload';
import { useTags } from '@/hooks/use-tags';
import { useToast } from '@/hooks/use-toast';

import PostButton from '@/components/post-button';

import CustomTextarea from './(components)/custom-textarea';
import EditHeader from './(components)/edit-header';
import DropZone from './(components)/image-drop-zone';
import ImagePreview from './(components)/image-preview';
import TagInput from './(components)/tag-input';

import s from './style.module.scss';

interface ContentEditPageFrameProps {
  handleApi?: () => void;
  initialContent?: string;
  initialTags?: string[];
  initialTitle?: string;
  titleText: string;
  toastMessage?: string;
  type: 'content' | 'thread';
}

export default function ContentEditPageFrame({
  titleText,
  initialTitle = '',
  initialContent = '',
  initialTags = [],
  handleApi,
  toastMessage,
  type,
}: ContentEditPageFrameProps) {
  const { imagePreview, getRootProps, getInputProps, isDragActive } = useImageUpload();
  const { tags, newTag, setNewTag, addTag, removeTag, setTags } = useTags();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    const isEnabled = title.trim() !== '' && content.trim() !== '';
    setIsPostButtonEnabled((prev) => {
      if (prev !== isEnabled) {
        return isEnabled;
      }
      return prev;
    });
  }, [title, content]);

  const handlePost = () => {
    addToast(`${toastMessage}`, 'success', 1500);
    if (isPostButtonEnabled && handleApi) {
      handleApi();
    }
  };

  if (type === 'content') {
    return (
      <div className={s.editContainer}>
        <EditHeader
          titleText={titleText}
          onClick={() => {
            window.history.back();
          }}
        />
        <div className={s.imageSection}>
          <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!imagePreview}>
            {imagePreview && <ImagePreview src={imagePreview} />}
          </DropZone>
        </div>
        <div className={s.contentSection}>
          <div className={s.titleInputBox}>
            <CustomTextarea placeholder="여행의 제목을 달아주세요!" value={title} onChange={(e: string) => setTitle(e)} />
          </div>
          <TagInput tags={tags} newTag={newTag} setNewTag={setNewTag} addTag={addTag} removeTag={removeTag} />
        </div>
        <div className={s.divider} />
        <div className={s.buttonSection}>
          <PostButton text="발행하기" onClick={handlePost} disabled={!isPostButtonEnabled} />
        </div>
      </div>
    );
  }
  return (
    <div className={s.editContainer}>
      <EditHeader
        titleText={titleText}
        onClick={() => {
          window.history.back();
        }}
      />
      <div className={s.imageSection}>
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!imagePreview}>
          {imagePreview && <ImagePreview src={imagePreview} />}
        </DropZone>
      </div>
      <div className={s.contentSection}>
        {/* <div className={s.titleInputBox}>
          <CustomTextarea placeholder="여행의 제목을 달아주세요!" value={title} onChange={(e: string) => setTitle(e)} />
        </div> */}
        <div className={s.textAreaBox}>
          <CustomTextarea placeholder="여행 내용을 입력해주세요!" value={content} onChange={(e: string) => setContent(e)} maxLength={500} />
        </div>
        <TagInput tags={tags} newTag={newTag} setNewTag={setNewTag} addTag={addTag} removeTag={removeTag} />
      </div>
      <div className={s.divider} />
      <div className={s.buttonSection}>
        <PostButton text="발행하기" onClick={handlePost} disabled={!isPostButtonEnabled} />
      </div>
    </div>
  );
}
