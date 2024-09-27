import { useEffect, useState } from 'react';

import useCreateContent from '@/hooks/contents/use-create-content';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useTags } from '@/hooks/use-tags';
import { useToast } from '@/hooks/use-toast';

import CustomTextarea from '@/components/content-edit-page-frame/(components)/custom-textarea';
import EditHeader from '@/components/content-edit-page-frame/(components)/edit-header';
import DropZone from '@/components/content-edit-page-frame/(components)/image-drop-zone';
import ImagePreview from '@/components/content-edit-page-frame/(components)/image-preview';
import TagInput from '@/components/content-edit-page-frame/(components)/tag-input';
import PostButton from '@/components/post-button';

import s from './style.module.scss';

export default function ContentCreatePage() {
  const { mutate: createContent } = useCreateContent();

  const { imagePreview, getRootProps, getInputProps, isDragActive } = useImageUpload();
  const { tags, newTag, setNewTag, addTag, removeTag } = useTags();
  const [title, setTitle] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = () => {
    createContent(
      {
        body: { title, categoryId: 0, imgUrl: imagePreview || '', profileIds: [14], tagIds: [] },
      },
      {
        onSuccess: (data) => {
          addToast('발행이 성공되었습니다!', 'success');
          setTimeout(() => {
            window.location.href = `/content/${data.contentId}`;
          }, 3000);
        },
        onError: () => {
          addToast('새 글 발행이 실패하였습니다.', 'error');
        },
      },
    );
  };

  useEffect(() => {
    const isEnabled = title.trim() !== '';
    setIsPostButtonEnabled((prev) => {
      if (prev !== isEnabled) {
        return isEnabled;
      }
      return prev;
    });
  }, [title]);

  return (
    <div className={s.editContainer}>
      <EditHeader
        titleText="새 글 작성하기"
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
        <PostButton text="발행하기" onClick={handleSubmit} disabled={!isPostButtonEnabled} />
      </div>
    </div>
  );
}
