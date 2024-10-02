import React, { memo, useEffect, useState } from 'react';

import useCreateContent from '@/hooks/contents/use-create-content';
import { useUploadImagesToServer } from '@/hooks/photo/use-upload-images';
import { useTagManagement } from '@/hooks/tags/use-tag-management';
import { useImagesUploadToLocal } from '@/hooks/use-image-upload';
import { useToast } from '@/hooks/use-toast';

import CustomTextarea from '@/components/content-edit-page-frame/(components)/custom-textarea';
import EditHeader from '@/components/content-edit-page-frame/(components)/edit-header';
import DropZone from '@/components/content-edit-page-frame/(components)/image-drop-zone';
import ImagePreview from '@/components/content-edit-page-frame/(components)/image-preview';
import TagInput from '@/components/content-edit-page-frame/(components)/tag-input';
import PostButton from '@/components/post-button';

import s from './style.module.scss';

const ContentCreatePage = memo(() => {
  const { mutate: createContent } = useCreateContent();
  const { mutate: uploadImages } = useUploadImagesToServer();

  const { uploadImageFile, fileFormat, getRootProps, getInputProps, isDragActive, resetImage, setUploadImageFile, errorMessage } = useImagesUploadToLocal();
  const { tags, addTag, removeTag } = useTagManagement();
  const [title, setTitle] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = () => {
    if (!title) {
      addToast('제목을 입력해주세요.', 'error');
    }
    createContent(
      {
        body: { title, categoryId: 1, imgUrl: '', attendeeIds: [], tagIds: tags.map((tag) => tag.tagId) },
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

    // if (uploadImageFile) {
    //   console.log('uploadImageFile', uploadImageFile);
    //   uploadImages(
    //     { imageType: 'content', images: [uploadImageFile] },
    //     {
    //       onSuccess: (data) => {
    //         const uploadedImageUrl = data;
    //         console.log('>> uploadedImageUrl', uploadedImageUrl);
    //       },
    //       onError: () => {
    //         addToast('이미지 업로드에 실패하였습니다.', 'error');
    //       },
    //     },
    //   );
    // }

    // if (imagePreview) {
    //   uploadImages(
    //     { imageType: 'content', images: [fileFormat] },
    //     {
    //       onSuccess: (data) => {
    //         const uploadedImageUrl = data.image_url[0];
    //         createContent(
    //           {
    //             body: {
    //               title,
    //               categoryId: 1,
    //               imgUrl: uploadedImageUrl,
    //               profileIds: [],
    //               tagIds: tags.map((tag) => tag.id),
    //             },
    //           },
    //           {
    //             onSuccess: (data) => {
    //               addToast('발행이 성공되었습니다!', 'success');
    //               setTimeout(() => {
    //                 window.location.href = `/content/${data.contentId}`; // Redirect to the new content page
    //               }, 3000);
    //             },
    //             onError: () => {
    //               addToast('새 글 발행이 실패하였습니다.', 'error');
    //             },
    //           },
    //         );
    //       },
    //       onError: () => {
    //         addToast('이미지 업로드에 실패하였습니다.', 'error');
    //       },
    //     },
    //   );
    // }
    // createContent(
    //   {
    //     body: { title, categoryId: 1, imgUrl: imagePreview || '', profileIds: [], tagIds: [] },
    //   },
    //   {
    //     onSuccess: (data) => {
    //       addToast('발행이 성공되었습니다!', 'success');
    //       setTimeout(() => {
    //         window.location.href = `/content/${data.contentId}`;
    //       }, 3000);
    //     },
    //     onError: () => {
    //       addToast('새 글 발행이 실패하였습니다.', 'error');
    //     },
    //   },
    // );
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
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!uploadImageFile}>
          {uploadImageFile && <ImagePreview imageFile={uploadImageFile} />}
        </DropZone>
      </div>
      <div className={s.contentSection}>
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
});
ContentCreatePage.displayName = 'ContentCreatePage';
export default ContentCreatePage;
