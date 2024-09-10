import type { MouseEvent } from 'react';

import s from './style.module.scss';

interface InterfaceProps {
  handle: (e: MouseEvent<HTMLButtonElement>) => void;
  sort: 'recently' | 'popularly';
}

export default function SortContainer({ sort, handle }: InterfaceProps) {
  return (
    <div className={s.container}>
      <button id="resently" type="button" className={s.button} onClick={handle}>
        최신순
      </button>
      <button id="popularly" type="button" className={s.button} onClick={handle}>
        인기순
      </button>
    </div>
  );
}
