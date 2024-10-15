import { useEffect, useState } from 'react';

import { ROUTES } from '@/constants/router';

import { useGetRouteParamNumber } from '@/hooks/contents/core/use-get-route-param-number';
import { useImagesUploadToLocal } from '@/hooks/contents/core/use-image-upload-local';
import { useUploadImagesToServer } from '@/hooks/photo/use-upload-images';
import { useTagManagement } from '@/hooks/tags/use-tag-management';
import { useCreateThreads } from '@/hooks/threads/use-create-thread';
import { useToast } from '@/hooks/use-toast';

import ButtonFrame from '@/components/content-edit-page-frame/(components)/button-frame';
import CustomTextarea from '@/components/content-edit-page-frame/(components)/custom-textarea';
import EditHeader from '@/components/content-edit-page-frame/(components)/edit-header';
import DropZone from '@/components/content-edit-page-frame/(components)/image-drop-zone';
import ImagePreview from '@/components/content-edit-page-frame/(components)/image-preview';
import TagInput from '@/components/content-edit-page-frame/(components)/tag-input';
import PostButton from '@/components/post-button';

import s from './style.module.scss';

export default function ContentCreatePage() {
  const { mutate: createThread } = useCreateThreads();
  const { mutate: uploadImages } = useUploadImagesToServer();
  const contentId = useGetRouteParamNumber('contentId');
  const { uploadImageFile, getRootProps, getInputProps, isDragActive, resetImage } = useImagesUploadToLocal();
  const { tags, addTag, removeTag } = useTagManagement();
  const [content, setContent] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!content) {
      addToast('세부 내용을 입력해주세요.', 'error');
      return;
    }

    setLoading(true);
    if (uploadImageFile && typeof uploadImageFile !== 'string') {
      uploadImages(
        { imageType: 'thread', images: [uploadImageFile] },
        {
          onSuccess: (uploadImageData) => {
            const uploadedImageUrl: string[] = uploadImageData.image_url;
            createThread(
              {
                contentId,
                reqBody: {
                  texts: content,
                  tagIds: tags.map((tag) => tag.tagId),
                  threadImg: uploadedImageUrl[0],
                },
              },
              {
                onSuccess: () => {
                  window.location.href = `${ROUTES.content.detail(contentId)}`;
                },
                onError: () => {
                  setLoading(false);
                  addToast('새 글 발행이 실패하였습니다.', 'error');
                },
              },
            );
          },
          onError: (error) => {
            setLoading(false);
            addToast(`이미지 업로드에 실패하였습니다. ${error.message}`, 'error');
          },
        },
      );
    } else {
      createThread(
        {
          contentId,
          reqBody: {
            texts: content,
            tagIds: tags.map((tag) => tag.tagId),
            threadImg: '',
          },
        },
        {
          onSuccess: () => {
            window.location.href = `${ROUTES.content.detail(contentId)}`;
          },
          onError: () => {
            setLoading(false);
            addToast('발행을 실패하였습니다.', 'error');
          },
        },
      );
    }
  };

  useEffect(() => {
    const isEnabled = content.trim() !== '';
    setIsPostButtonEnabled((prev) => {
      if (prev !== isEnabled) {
        return isEnabled;
      }
      return prev;
    });
  }, [content]);

  return (
    <div className={s.editContainer}>
      <EditHeader
        titleText="새 글 작성하기"
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
        <div className={s.textAreaBox}>
          <CustomTextarea placeholder="여행 내용을 입력해주세요!" value={content} onChange={(e: string) => setContent(e)} />
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
