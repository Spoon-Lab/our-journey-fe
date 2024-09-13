import type { InputHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import s from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: ReactNode;
  icon?: ReactNode;
  labelText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ labelText, icon, errorMessage, id, ...rest }, ref) => (
  <div className={s.inputWrapper}>
    {labelText && <label htmlFor={id}>{labelText}</label>}
    <div className={s.inputBox}>
      <input id={id} ref={ref} {...rest} />
      {icon && <span>{icon}</span>}
    </div>
    <p className={s.errorMessage}>{errorMessage}</p>
  </div>
));

Input.displayName = 'Input';

export default Input;
