import { useEffect, useState } from 'react';

import useGetOneContent from '@/hooks/contents/use-get-one-content';
import { useUploadImagesToServer } from '@/hooks/photo/use-upload-images';
import { useTagManagement } from '@/hooks/tags/use-tag-management';
import { useVerifyTags } from '@/hooks/tags/use-verify-tags';
import { useEditThread } from '@/hooks/threads/use-edit-thread';
import useGetThreads from '@/hooks/threads/use-get-threads';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';
import { useImagesUploadToLocal } from '@/hooks/use-image-upload-local';
import { useToast } from '@/hooks/use-toast';

import ButtonFrame from '@/components/content-edit-page-frame/(components)/button-frame';
import CustomTextarea from '@/components/content-edit-page-frame/(components)/custom-textarea';
import EditHeader from '@/components/content-edit-page-frame/(components)/edit-header';
import DropZone from '@/components/content-edit-page-frame/(components)/image-drop-zone';
import ImagePreview from '@/components/content-edit-page-frame/(components)/image-preview';
import TagInput from '@/components/content-edit-page-frame/(components)/tag-input';
import PostButton from '@/components/post-button';

import s from './style.module.scss';

export default function ThreadEditPage() {
  const contentId = useGetRouteParamNumber('contentId');
  const threadId = useGetRouteParamNumber('threadId');

  const { data: fetchedThreadList } = useGetThreads(contentId);
  const { data: fetchedContent } = useGetOneContent(contentId);
  const { mutate: editThread } = useEditThread();
  const { mutate: uploadImages } = useUploadImagesToServer();

  const { uploadImageFile, getRootProps, getInputProps, isDragActive, resetImage, setUploadImageFile } = useImagesUploadToLocal();
  const { tags, setTags, addTag, removeTag } = useTagManagement();
  const [title, setTitle] = useState<string>('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);
  const [tagNames, setTagNames] = useState<string[]>([]);
  const { verifiedTags, isVerificationComplete } = useVerifyTags(tagNames);

  const { addToast } = useToast();

  useEffect(() => {
    if (fetchedThreadList) {
      const findThread = fetchedThreadList.list.content.find((thread) => thread.threadId === threadId);
      setTitle(findThread?.texts || '');
      setTagNames(findThread?.tagNames || []);
      setUploadImageFile(findThread?.threadImg || '');
    }
  }, [fetchedThreadList, setUploadImageFile, threadId]);

  useEffect(() => {
    if (isVerificationComplete) {
      setTags(verifiedTags);
    }
  }, [isVerificationComplete, verifiedTags, setTags]);

  const handleSubmit = () => {
    if (!title) {
      addToast('세부 내용을 입력해주세요.', 'error');
      return;
    }
    if (uploadImageFile && typeof uploadImageFile !== 'string') {
      uploadImages(
        { imageType: 'content', images: [uploadImageFile] },
        {
          onSuccess: (uploadImageData) => {
            const uploadedImageUrl: string[] = uploadImageData.image_url;
            editThread(
              {
                contentId,
                threadId,
                data: {
                  texts: title,
                  threadImg: uploadedImageUrl[0],
                  tags: tags.map((tag) => tag.tagId),
                },
              },
              {
                onSuccess: () => {
                  addToast('발행이 성공되었습니다!', 'success');
                  setTimeout(() => {
                    window.location.href = `/content/${contentId}`;
                  }, 3000);
                },
                onError: () => {
                  addToast('새 글 발행이 실패하였습니다.', 'error');
                },
              },
            );
          },
          onError: (error) => {
            addToast(`이미지 업로드에 실패하였습니다. ${error.message}`, 'error');
          },
        },
      );
    } else {
      editThread(
        {
          contentId,
          threadId,
          data: {
            texts: title,
            tags: tags.map((tag) => tag.tagId),
            threadImg: uploadImageFile,
          },
        },
        {
          onSuccess: () => {
            addToast('발행이 성공되었습니다!', 'success');
            setTimeout(() => {
              window.location.href = `/content/${contentId}`;
            }, 3000);
          },
          onError: () => {
            addToast('발행을 실패하였습니다.', 'error');
          },
        },
      );
    }
  };

  useEffect(() => {
    if (fetchedContent) {
      setUploadImageFile(fetchedContent.postImg || '');
      setTitle(fetchedContent.title || '');
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
          <CustomTextarea placeholder="여행 내용을 입력해주세요!" value={title} onChange={(e: string) => setTitle(e)} />
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
