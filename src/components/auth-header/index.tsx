import { useRouter } from 'next/router';

import s from './style.module.scss';

import { ArrowBack } from '@/assets/icons';

interface HeaderProps {
  text?: string;
}

export default function AuthHeader({ text }: HeaderProps) {
  const router = useRouter();
  return (
    <header className={s.headerContainer}>
      <button aria-label="뒤로 가기" type="button" onClick={() => router.back()}>
        <ArrowBack />
      </button>
      <p>{text}</p>
    </header>
  );
}
