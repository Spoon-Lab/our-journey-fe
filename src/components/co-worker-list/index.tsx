import React from 'react';

import s from './style.module.scss';

import { ForwardIcon, PersonIcon } from '@/assets/icons';

interface CoWorkerListProps {
  coWorkers: string[];
  onAddCoWorker: () => void;
  removeCoWorker: (coWorker: string) => void;
}

export default function CoWorkerList({ coWorkers, removeCoWorker, onAddCoWorker }: CoWorkerListProps) {
  return (
    <div className={s.coWorkers}>
      {coWorkers.map((coWorker, index) => (
        <span key={index} className={s.coWorker}>
          {coWorker}
          <button type="button" onClick={() => removeCoWorker(coWorker)}>
            x
          </button>
        </span>
      ))}
      <button type="button" onClick={onAddCoWorker} className={s.addCoWorkerButton}>
        <div className={s.addWorkerTitleWrap}>
          <PersonIcon /> <p>작업자 추가하기</p>
        </div>
        <div className={s.forwardIconWrap}>
          <ForwardIcon />
        </div>
      </button>
    </div>
  );
}
