import type { Contents } from '@/types/contents';

import GridCard from '../grid-card';

import s from './style.module.scss';

export default function FeedGrid({ data }: { data?: Contents[] }) {
  return <section className={s.feedWrapper}>{data?.map((post) => <GridCard key={post.categoryId} data={post} />)}</section>;
}
