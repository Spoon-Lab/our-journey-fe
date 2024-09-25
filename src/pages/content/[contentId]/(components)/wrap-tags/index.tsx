import s from './style.module.scss';

interface WrapTagsProps {
  tags: string[];
}

export default function WrapTags({ tags }: WrapTagsProps) {
  return (
    <div className={s.tags}>
      {tags?.map((tag, index) => (
        <span key={index} className={s.tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}
