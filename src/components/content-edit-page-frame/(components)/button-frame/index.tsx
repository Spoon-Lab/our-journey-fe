import s from './style.module.scss';

interface ButtonFrameProps {
  children: React.ReactNode;
  onclick: () => void;
}

export default function ButtonFrame({ children, onclick }: ButtonFrameProps) {
  return (
    <button className={s.button} type="button" onClick={onclick}>
      {children}
    </button>
  );
}
