import ContentEditPageFrame from '@/components/content-edit-page-frame';

import s from './style.module.scss';

export default function CreatePage() {
  return <ContentEditPageFrame titleText="새 글 작성하기" toastMessage="발행이 완료되었습니다!" type="content" />;
}
