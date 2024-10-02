import s from './style.module.scss';

interface ButtonFrameProps {
  children: React.ReactNode;
  disabled?: boolean;
  onclick: () => void;
}

export default function ButtonFrame({ children, onclick, disabled }: ButtonFrameProps) {
  return (
    <button className={s.button} type="button" onClick={onclick} disabled={disabled}>
      {children}
    </button>
  );
}
