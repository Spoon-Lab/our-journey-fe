import s from './style.module.scss';

interface PostButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
}

export default function PostButton({ text, onClick, disabled = true }: PostButtonProps) {
  return (
    <button
      className={`${s.postButton}`}
      type="submit"
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
