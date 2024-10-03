import Link from 'next/link';

import s from './style.module.scss';

interface WrapTagsProps {
  tag: string;
}

export default function WrapTag({ tag }: WrapTagsProps) {
  return (
    <div className={s.tags}>
      <Link href={`/search?title=${tag}`}>#{tag}</Link>
    </div>
  );
}
