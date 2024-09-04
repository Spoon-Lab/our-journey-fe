import type { InputHTMLAttributes, ReactNode } from 'react';

import s from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  inputSize?: 's' | 'md' | 'lg' | 'full';
}

export default function Input({ inputSize = 'md', icon, ...rest }: InputProps) {
  return (
    <div className={`${s.inputWrapper} ${s[`inputWrapper_${inputSize}`]}`}>
      <input className={s.input} {...rest} />
      {icon && <span className={s.icon}>{icon}</span>}
    </div>
  );
}
