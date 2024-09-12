import type { Content } from '@/types/contents';

import GridCard from '../grid-card';

import s from './style.module.scss';

export default function FeedGrid({ data }: { data?: Content[] }) {
  return <section className={s.feedWrapper}>{data?.map((post) => <GridCard key={post.contentId} data={post} />)}</section>;
}
