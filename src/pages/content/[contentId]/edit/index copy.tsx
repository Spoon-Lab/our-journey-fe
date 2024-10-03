import { useEffect, useState } from 'react';

import { TOAST_MESSAGE } from '@/constants/toast-message';

import { useEditContent } from '@/hooks/contents/use-edit-content';
import useGetOneContent from '@/hooks/contents/use-get-one-content';
import { useUploadImagesToServer } from '@/hooks/photo/use-upload-images';
import { useTagManagement } from '@/hooks/tags/use-tag-management';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';
import { useImagesUploadToLocal } from '@/hooks/use-image-upload-local';
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

export default function ContentEditPage() {
  const contentId = useGetRouteParamNumber('contentId');

  const { data: fetchedContent } = useGetOneContent(contentId);
  const { mutate: editContent } = useEditContent();
  const { mutate: uploadImages } = useUploadImagesToServer();

  const { uploadImageFile, getRootProps, getInputProps, isDragActive, resetImage, setUploadImageFile } = useImagesUploadToLocal();
  const { tags, setTags, addTag, removeTag } = useTagManagement();
  const [title, setTitle] = useState<string>('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = () => {
    if (!title) {
      addToast(TOAST_MESSAGE.CONTENT.ERR.NO_TITLE, 'error');
      return;
    }
    if (uploadImageFile && typeof uploadImageFile !== 'string') {
      uploadImages(
        {
          imageType: 'content',
          images: [uploadImageFile],
        },
        {
          onSuccess: (uploadImageData) => {
            const uploadedImageUrl: string[] = uploadImageData.image_url;
            editContent(
              {
                data: {
                  title,
                  imgUrl: uploadedImageUrl[0],
                  tags: tags.map((tag) => tag.tagId),
                },
                contentId,
              },
              {
                onSuccess: () => {
                  addToast(TOAST_MESSAGE.CONTENT.EDIT, 'success');
                  // setTimeout(() => {
                  //   window.location.href = `/content/${contentId}`;
                  // }, 3000);
                },
                onError: () => {
                  addToast(TOAST_MESSAGE.CONTENT.ERR.EDIT, 'error');
                },
              },
            );
          },
          onError: () => {
            addToast(TOAST_MESSAGE.IMAGE_UPLOAD.ERR.ADD, 'error');
          },
        },
      );
    } else {
      editContent(
        {
          data: {
            title,
            imgUrl: '',
            tags: tags.map((tag) => tag.tagId),
          },
          contentId,
        },
        {
          onSuccess: () => {
            addToast(TOAST_MESSAGE.CONTENT.EDIT, 'success');
            // setTimeout(() => {
            //   window.location.href = `/content/${contentId}`;
            // }, 3000);
          },
          onError: () => {
            addToast(TOAST_MESSAGE.CONTENT.ERR.EDIT, 'error');
          },
        },
      );
    }
  };

  useEffect(() => {
    if (fetchedContent) {
      setUploadImageFile(fetchedContent.postImg);
      setTitle(fetchedContent.title);
      setTags(fetchedContent.tags);
    }
  }, [fetchedContent]);

  useEffect(() => {
    const isEnabled = title.trim() !== '';
    setIsPostButtonEnabled((prev) => {
      if (prev !== isEnabled) {
        return isEnabled;
      }
      return prev;
    });
  }, [title]);

  console.log(tags);

  return (
    <div className={s.editContainer}>
      <EditHeader
        titleText="수정하기"
        onClick={() => {
          window.history.back();
        }}
      />
      <div className={s.imageSection}>
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!uploadImageFile}>
          {uploadImageFile && <ImagePreview imageFile={uploadImageFile} />}
        </DropZone>
      </div>
      <div className={s.contentSection}>
        <div className={s.wrapActions}>
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
        <PostButton text="발행하기" onClick={handleSubmit} disabled={!isPostButtonEnabled} />
      </div>
    </div>
  );
}
