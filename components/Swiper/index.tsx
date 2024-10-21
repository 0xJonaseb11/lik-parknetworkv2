import { HTMLAttributes, useEffect } from 'react';
import { SwiperOptions } from 'swiper/types';
import classNames from '../../utils/classnames';

import MSwiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type SwiperProps = HTMLAttributes<HTMLDivElement> & {
  options?: SwiperOptions;
  name: string;
};

export default function Swiper({
  name,
  options,
  className,
  children,
  ...props
}: SwiperProps) {
  useEffect(
    () => {
      new MSwiper(`.${name}`, {
        modules: [Pagination, Navigation],
        ...options
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className={classNames('swiper', name, className)} {...props}>
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
}
