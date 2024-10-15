import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';
import { TOAST_MESSAGE } from '@/constants/toast-message';

import useCreateContent from '@/hooks/contents/api/use-create-content';
import { useImagesUploadToLocal } from '@/hooks/contents/core/use-image-upload-local';
import { useSelectCategories } from '@/hooks/contents/use-select-categories';
import { useUploadImagesToServer } from '@/hooks/photo/use-upload-images';
import { useTagManagement } from '@/hooks/tags/use-tag-management';
import { useToast } from '@/hooks/use-toast';

import ButtonFrame from '@/components/content-edit-page-frame/(components)/button-frame';
import CustomTextarea from '@/components/content-edit-page-frame/(components)/custom-textarea';
import EditHeader from '@/components/content-edit-page-frame/(components)/edit-header';
import DropZone from '@/components/content-edit-page-frame/(components)/image-drop-zone';
import ImagePreview from '@/components/content-edit-page-frame/(components)/image-preview';
import SelectCategoriesToggle from '@/components/content-edit-page-frame/(components)/select-categories-toggle';
import TagInput from '@/components/content-edit-page-frame/(components)/tag-input';
import PostButton from '@/components/post-button';

import s from './style.module.scss';

const ContentCreatePage = memo(() => {
  const router = useRouter();

  const { mutate: createContent } = useCreateContent();
  const { mutate: uploadImages } = useUploadImagesToServer();

  const { uploadImageFile, getRootProps, getInputProps, isDragActive, resetImage } = useImagesUploadToLocal();
  const { tags, addTag, removeTag } = useTagManagement();
  const { selectedCategory, toggleCategory } = useSelectCategories();

  const [title, setTitle] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!title) {
      addToast(TOAST_MESSAGE.CONTENT.ERR.NO_TITLE, 'error');
      return;
    }

    setLoading(true);

    if (uploadImageFile && typeof uploadImageFile !== 'string') {
      uploadImages(
        { imageType: 'content', images: [uploadImageFile] },
        {
          onSuccess: (uploadImageData) => {
            const uploadedImageUrl: string[] = uploadImageData.image_url;
            createContent(
              {
                body: { title, categoryId: selectedCategory, imgUrl: uploadedImageUrl[0], attendeeIds: [], tagIds: tags.map((tag) => tag.tagId) },
              },
              {
                onSuccess: (createContentData) => {
                  window.location.href = ROUTES.thread.create(createContentData.id);
                },
                onError: () => {
                  setLoading(false);
                  addToast(TOAST_MESSAGE.CONTENT.ADD.FAIL, 'error');
                },
              },
            );
          },
          onError: (error) => {
            setLoading(false);
            addToast(`${TOAST_MESSAGE.IMAGE_UPLOAD.ADD.FAIL} ${error.message}`, 'error');
          },
        },
      );
    } else {
      createContent(
        {
          body: { title, categoryId: selectedCategory, imgUrl: '', attendeeIds: [], tagIds: tags.map((tag) => tag.tagId) },
        },
        {
          onSuccess: (data) => {
            window.location.href = ROUTES.thread.create(data.id);
          },
          onError: () => {
            setLoading(false);
            addToast(TOAST_MESSAGE.CONTENT.ADD.FAIL, 'error');
          },
        },
      );
    }
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
    <div className={s.createContainer}>
      <EditHeader
        titleText="새 글 작성하기"
        onClick={() => {
          void router.push(ROUTES.main);
        }}
      />
      <div className={s.imageSection}>
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!uploadImageFile}>
          {uploadImageFile && <ImagePreview imageFile={uploadImageFile} />}
        </DropZone>
      </div>
      <div className={s.contentSection}>
        <div className={s.wrapActions}>
          <SelectCategoriesToggle selectedCategory={selectedCategory} toggleCategory={toggleCategory} />
          <ButtonFrame onclick={resetImage} disabled={!uploadImageFile}>
            이미지 초기화
          </ButtonFrame>
        </div>
        <div className={s.titleInputBox}>
          <CustomTextarea placeholder="여행의 제목을 달아주세요!" value={title} onChange={(e: string) => setTitle(e)} />
        </div>
        <TagInput tags={tags} addTag={addTag} removeTag={removeTag} />
      </div>
      <div className={s.divider} />
      <div className={s.buttonSection}>
        <PostButton text="발행하기" onClick={handleSubmit} disabled={!isPostButtonEnabled || loading} />
      </div>
    </div>
  );
});
ContentCreatePage.displayName = 'ContentCreatePage';
export default ContentCreatePage;
