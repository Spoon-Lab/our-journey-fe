import { useState } from 'react';

export const useCoWorkers = () => {
  const [coWorkers, setCoWorkers] = useState<string[]>([]);

  const addCoWorker = (newCoWorker: string) => {
    if (newCoWorker && !coWorkers.includes(newCoWorker)) {
      setCoWorkers([...coWorkers, newCoWorker]);
    }
  };

  const removeCoWorker = (coWorkerToRemove: string) => {
    setCoWorkers(coWorkers.filter((coWorker) => coWorker !== coWorkerToRemove));
  };

  return { coWorkers, addCoWorker, removeCoWorker };
};
