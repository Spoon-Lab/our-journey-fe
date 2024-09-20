import ModalPortal from '../portal';

import s from './style.module.scss';

interface ModalProps {
  leftBtnClick: () => void;
  leftBtnText: string;
  rightBtnClick: () => void;
  rightBtnText: string;
  subText?: string;
  text: string;
}

export default function Modal({ text, subText, leftBtnText, rightBtnText, leftBtnClick, rightBtnClick }: ModalProps) {
  return (
    <ModalPortal>
      <div className={s.container}>
        <div className={s.modalWrapper}>
          <div className={s.textWrapper}>
            <h1>{text}</h1>
            <p>{subText}</p>
          </div>
          <div className={s.btnWrapper}>
            <button type="button" className={s.left} onClick={leftBtnClick}>
              {leftBtnText}
            </button>
            <button type="button" className={s.right} onClick={rightBtnClick}>
              {rightBtnText}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
