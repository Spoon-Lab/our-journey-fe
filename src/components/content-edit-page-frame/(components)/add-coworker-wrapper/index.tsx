import { useState } from 'react';

import { isEmptyArr } from '@/utils/isEmptyArr';

import SearchCoworkerPage from '../search-coworker-page';

import s from './style.module.scss';

import { ForwardIcon, PersonIcon } from '@/assets/icons';

interface CoWorkerListProps {
  coWorkers: string[];
  onAddCoWorker: () => void;
  removeCoWorker: (coWorker: string) => void;
}

export default function AddCoworkerWrapper({ coWorkers, removeCoWorker, onAddCoWorker }: CoWorkerListProps) {
  const [isOpenSearchCoworkersPage, setOpenSearchCoworkersPage] = useState<boolean>(false);

  const handleoWorker = () => {
    setOpenSearchCoworkersPage((prev) => !prev);
  };

  return (
    <div className={s.coWorkers}>
      {isOpenSearchCoworkersPage && <SearchCoworkerPage onClosed={handleoWorker} />}

      {coWorkers.map((coWorker, index) => (
        <span key={index} className={s.coWorker}>
          {coWorker}
          <button type="button" onClick={() => removeCoWorker(coWorker)}>
            x
          </button>
        </span>
      ))}
      <button type="button" onClick={handleoWorker} className={s.addCoWorkerButton}>
        <div className={s.addWorkerTitleWrap}>
          <PersonIcon /> {!isEmptyArr(coWorkers) ? coWorkers.map((coWorker, idx) => <span key={idx}>{coWorker}</span>) : <span>작업자 추가하기</span>}
        </div>
        <div className={s.forwardIconWrap}>
          <ForwardIcon />
        </div>
      </button>
    </div>
  );
}
