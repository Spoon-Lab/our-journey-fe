import type { ButtonHTMLAttributes, ReactNode } from 'react';

import s from './style.module.scss';

interface InterfaceButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, type = 'button', ...rest }: InterfaceButton) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={s.btnBox} {...rest} type={type}>
      {children}
    </button>
  );
}
