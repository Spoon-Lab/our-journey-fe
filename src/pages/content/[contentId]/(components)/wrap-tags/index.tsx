import Link from 'next/link';

import type { Tag } from '@/types/threads';

import s from './style.module.scss';

interface WrapTagsProps {
  tags: Tag[];
}

export default function WrapTags({ tags }: WrapTagsProps) {
  return (
    <div className={s.tags}>
      {tags?.map((tag) => (
        <Link key={tag.tagId} href={`/search?title=${tag.tagName}`}>
          #{tag.tagName}
        </Link>
      ))}
    </div>
  );
}
