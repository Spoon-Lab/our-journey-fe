import React from 'react';

import s from './style.module.scss';

interface Props {
  chipList: string[];
}

const Chip = React.memo((props: Props) => {
  const { chipList } = props;

  const key = chipList.join();

  return (
    <div className={s.chipBox}>
      {chipList.map((chip, index) => (
        <React.Fragment key={`${key}${chip}`}>
          <span className={s.chipText}>{`#${chip}`}</span>
          {chipList.length - 1 > index && <span className={`${s.chipText} ${s.dot}`}>·</span>}
        </React.Fragment>
      ))}
    </div>
  );
});

Chip.displayName = 'Chip';

export default Chip;
