import Header from '@/components/header';

export default function NotFound() {
  return (
    <>
      <Header title="잘못된 페이지" />
      <section>페이지 경로가 잘못됐습니다. 뒤로가기 버튼을 눌러 이전 화면으로 이동해주세요.</section>
    </>
  );
}
