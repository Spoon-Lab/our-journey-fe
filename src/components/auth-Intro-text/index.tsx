import s from './style.module.scss';

interface AuthIntroTextProps {
  subText?: string;
  text: string;
}

export default function AuthIntroText({ text, subText }: AuthIntroTextProps) {
  return (
    <div className={s.textContainer}>
      <hr />
      <h1>{text}</h1>
      {subText && <p>{subText}</p>}
    </div>
  );
}
