import s from './style.module.scss';

interface AuthIntroTextProps {
  text: string;
}

export default function AuthIntroText({ text }: AuthIntroTextProps) {
  return (
    <div className={s.textContainer}>
      <hr />
      <h1>{text}</h1>
    </div>
  );
}
