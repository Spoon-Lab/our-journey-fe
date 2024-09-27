import { useEffect, useState } from 'react';

import useCreateContent from '@/hooks/contents/use-create-content';
import { useCreateThreads } from '@/hooks/threads/use-create-thread';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';
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
  const { mutate: createThread } = useCreateThreads();
  const contentId = useGetRouteParamNumber('contentId');
  const { imagePreview, getRootProps, getInputProps, isDragActive } = useImageUpload();
  const { tags, newTag, setNewTag, addTag, removeTag } = useTags();
  const [content, setContent] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = () => {
    createThread(
      {
        reqBody: {
          texts: content,
          tags: [],
          threadImg: imagePreview || '',
        },
        contentId,
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
        <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!imagePreview}>
          {imagePreview && <ImagePreview src={imagePreview} />}
        </DropZone>
      </div>
      <div className={s.contentSection}>
        <div className={s.textAreaBox}>
          <CustomTextarea placeholder="여행 내용을 입력해주세요!" value={content} onChange={(e: string) => setContent(e)} />
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
