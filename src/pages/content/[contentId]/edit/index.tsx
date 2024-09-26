import { useRouter } from 'next/router';

import useGetOneContent from '@/hooks/contents/use-get-one-content';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';

import ContentEditPageFrame from '@/components/content-edit-page-frame';

export default function ContentEditPage() {
  const router = useRouter();
  const contentId = useGetRouteParamNumber('contentId');
  const { data: fetchedContent } = useGetOneContent(contentId);

  if (!fetchedContent) {
    if (typeof window !== 'undefined') void router.push('/404');
    return null;
  }

  return (
    <ContentEditPageFrame
      titleText="수정하기"
      toastMessage="수정이 완료되었습니다!"
      initialContent={fetchedContent.title}
      initialTags={[]}
      initialTitle={fetchedContent.title}
      type="content"
    />
  );
}
