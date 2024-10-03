import type { MouseEvent } from 'react';

import s from './style.module.scss';

interface InterfaceProps {
  handle: (e: MouseEvent<HTMLButtonElement>) => void;
  sort: 'recently' | 'popularly';
}

export default function SortContainer({ sort, handle }: InterfaceProps) {
  return (
    <div className={s.container}>
      <button id="recently" type="button" className={`${s.button} ${sort === 'recently' ? s.active : ''}`} onClick={handle}>
        {/* 최신순 */}
        등록순
      </button>
      {/* <button id="popularly" type="button" className={`${s.button} ${sort === 'popularly' ? s.active : ''}`} onClick={handle}>
        인기순
      </button> */}
    </div>
  );
}
