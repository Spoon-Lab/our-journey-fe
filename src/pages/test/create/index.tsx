import { useEffect, useState } from 'react';

import { useCoWorkers } from '@/hooks/use-co-workers';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useTags } from '@/hooks/use-tags';

import CoWorkerList from '@/components/co-worker-list';
import Header from '@/components/header';
import DropZone from '@/components/image-drop-zone';
import ImagePreview from '@/components/image-preview';
import PostButton from '@/components/post-button';
import TagInput from '@/components/tag-input';

import s from './style.module.scss';

export default function CreatePage() {
  const { imagePreview, getRootProps, getInputProps, isDragActive, resetImage } = useImageUpload();
  const { tags, newTag, setNewTag, addTag, removeTag } = useTags();
  const { coWorkers, removeCoWorker } = useCoWorkers();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);
  const [isCoWorkerSliderOpen, setIsCoWorkerSliderOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedCoWorkers, setSelectedCoWorkers] = useState<string[]>([]);

  const handleSearch = () => {
    // 실제 검색 로직 구현
    const dummyResults = ['친구1', '친구2', '친구3'].filter((friend) => friend.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(dummyResults);
  };

  const handleSelect = (coWorker: string) => {
    if (!selectedCoWorkers.includes(coWorker)) {
      setSelectedCoWorkers([...selectedCoWorkers, coWorker]);
    }
  };

  const handleRemove = (coWorker: string) => {
    setSelectedCoWorkers(selectedCoWorkers.filter((worker) => worker !== coWorker));
  };

  const handleInvite = () => {
    // 실제 초대 로직 구현
    console.log('Invited co-workers:', selectedCoWorkers);
    setIsCoWorkerSliderOpen((prev) => !prev);
  };

  const handleAddCoWorker = () => {
    setIsCoWorkerSliderOpen((prev) => !prev);
  };

  useEffect(() => {
    // 제목, 내용이 비어있지 않고, 태그가 하나 이상 있을 때 버튼 활성화
    setIsPostButtonEnabled(title.trim() !== '' && content.trim() !== '' && tags.length > 0);
  }, [title, content, tags]);

  const handlePost = () => {
    if (isPostButtonEnabled) {
      console.log('Post!');
      // 여기에 실제 게시 로직을 구현합니다.
    }
  };

  return (
    <div className={s.createPage}>
      {isCoWorkerSliderOpen ? (
        <>
          <Header headerTitle="작업자 초대하기" isCoWorker={isCoWorkerSliderOpen} setCoWorker={setIsCoWorkerSliderOpen} />
          <div className={s.searchBar}>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="친구 검색..." />
            <button type="button" onClick={handleSearch}>
              검색
            </button>
          </div>
          <div className={s.searchResults}>
            {searchResults.map((result, index) => (
              <div key={index} className={s.searchResult}>
                {result}
                <button type="button" onClick={() => handleSelect(result)}>
                  선택
                </button>
              </div>
            ))}
          </div>
          <div className={s.selectedCoWorkers}>
            <h2>선택된 작업자</h2>
            {selectedCoWorkers.map((coWorker, index) => (
              <div key={index} className={s.selectedCoWorker}>
                {coWorker}
                <button type="button" onClick={() => handleRemove(coWorker)}>
                  제거
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleInvite} className={s.inviteButton}>
            초대하기
          </button>
        </>
      ) : (
        <>
          <Header headerTitle="새 글 작성하기" isCoWorker={isCoWorkerSliderOpen} setCoWorker={setIsCoWorkerSliderOpen} />
          <div className={s.wrapCreate}>
            <div className={s.imageArea}>
              <DropZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!imagePreview}>
                {imagePreview && <ImagePreview src={imagePreview} />}
              </DropZone>
            </div>
            <div className={s.wrapInput}>
              <div className={s.wrapActions}>
                <button type="button" className={s.uploadButton} onClick={resetImage}>
                  이미지 교체
                </button>
                <button type="button" className={s.cancelButton}>
                  꾸미기
                </button>
              </div>
              <div className={s.title}>
                <input type="text" placeholder="여행의 제목을 달아주세요!" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className={s.textArea}>
                <textarea placeholder="여행의 내용을 입력해주세요!" value={content} onChange={(e) => setContent(e.target.value)} />
              </div>
              <TagInput tags={tags} newTag={newTag} setNewTag={setNewTag} addTag={addTag} removeTag={removeTag} />
              <div className={s.divider} />
              <CoWorkerList coWorkers={coWorkers} removeCoWorker={removeCoWorker} onAddCoWorker={handleAddCoWorker} />
              <div className={s.bottomBtnArea}>
                <PostButton text="발행하기" onClick={handlePost} disabled={!isPostButtonEnabled} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
