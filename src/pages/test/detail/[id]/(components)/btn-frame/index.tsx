import s from './style.module.scss';

interface BtnFrameProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function BtnFrame({ children, onClick }: BtnFrameProps) {
  return (
    <button
      className={`${s.btnFrame}`}
      type="button"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
