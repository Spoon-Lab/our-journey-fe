import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import { useChangeCarousel } from '@/hooks/contents/use-change-carousel';

import Chip from '@/components/chip';

import s from './style.module.scss';

interface Props {
  data: Carousel[];
}

export interface Carousel {
  bannerId: string;
  chipText: string[];
  contentId: string;
  src: string;
  title: string;
}

export default function BannerCarousel(props: Props) {
  const { data } = props;
  const { currentId, carouselContainerRef } = useChangeCarousel(data);

  if (!data) {
    return <div />;
  }

  return (
    <div className={s.carouselWrapper}>
      <div className={s.carouselContainer} ref={carouselContainerRef}>
        {data.map((banner) => (
          <CarouselCard key={`banner-${banner.bannerId}`} {...banner} />
        ))}
      </div>
      <div className={s.orderDotBox}>
        {data.map((_, index) => (
          <div key={`order${index}`} className={`${s.orderDot} ${index === Number(currentId) - 1 ? s.active : ''}`} />
        ))}
      </div>
    </div>
  );
}

function CarouselCard(props: Carousel) {
  const { chipText, src, title, bannerId, contentId } = props;
  return (
    <Link id={bannerId} href={`${ROUTES.detail}?id=${contentId}`} className={s.carouselCard}>
      <div className={s.carouselImgBox}>
        <img alt="" src={src} className={s.carouselImg} loading="lazy" />
      </div>
      <div className={s.carouselDescription}>
        <h3 className={s.carouselTitle}>{title}</h3>
        <Chip key={`${chipText.join()}`} chipList={chipText} />
      </div>
    </Link>
  );
}
