import dynamic from 'next/dynamic';

import lottieLoading from '../../../public/lottie-loading.json';

import s from './style.module.scss';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

function LottieLoading() {
  return (
    <div className={s.container}>
      <Lottie loop animationData={lottieLoading} play />
    </div>
  );
}

export default LottieLoading;
