import { useImageUpload } from '@/hooks/use-image-upload';

import CoWorkerList from '@/components/co-worker-list';
import PostButton from '@/components/post-button';

import ButtonFrame from './(components)/button-frame';
import CustomTextarea from './(components)/\bcustom-textarea';
import EditHeader from './(components)/edit-header';
import DropZone from './(components)/image-drop-zone';
import ImagePreview from './(components)/image-preview';
import TagInput from './(components)/tag-input';

import s from './style.module.scss';

import { DecoImageIcon } from '@/assets/icons';

export default function CreatePage() {
  const { imagePreview, getRootProps, getInputProps, isDragActive } = useImageUpload();
  return (
    <div className={s.editContainer}>
      <EditHeader titleText="새로운 콘텐츠 작성" onClick={() => {}} />
      <div className={s.imageSection}>
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!imagePreview}>
          {imagePreview && <ImagePreview src={imagePreview} />}
        </DropZone>
      </div>
      <div className={s.wrapActions}>
        <ButtonFrame onclick={() => {}}>
          <DecoImageIcon />
          <span>꾸미기</span>
        </ButtonFrame>
      </div>
      <div className={s.contentSection}>
        <div className={s.titleInputBox}>
          <CustomTextarea placeholder="여행의 제목을 달아주세요!" value="" onChange={() => {}} />
        </div>
        <div className={s.textAreaBox}>
          <CustomTextarea placeholder="여행 내용을 입력해주세요!" value="" onChange={() => {}} maxLength={500} />
        </div>
        <TagInput tags={[]} newTag="" setNewTag={() => {}} addTag={() => {}} removeTag={() => {}} />
      </div>
      <div className={s.divider} />
      <CoWorkerList coWorkers={[]} removeCoWorker={() => {}} onAddCoWorker={() => {}} />
      <div className={s.buttonSection}>
        <PostButton text="발행하기" onClick={() => {}} disabled />
      </div>
    </div>
  );
}
