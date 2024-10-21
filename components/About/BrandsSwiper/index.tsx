'use client';

import { Fragment } from 'react';
import Swiper from '../../Swiper';

export default function BrandsSwiper() {
  return (
    <Fragment>
      <Swiper
        name="brands-swiper"
        options={{
          direction: 'horizontal',

          pagination: {
            clickable: true,
            el: '#swiper-brands'
          },

          breakpoints: {
            '500': {
              slidesPerView: 3,
              spaceBetween: 8
            },
          }
        }}
      >
        <div className="swiper-slide">
          <a
            href="https://www.optimism.com/"
            className="card card-body card-hover px-2 mx-2"
          >
            <img
              style={{
                width: 154,
                height: 80,
                objectFit: 'contain'
              }}
              src="logo-optimism.svg"
              className="d-block mx-auto my-2"
              alt="Optimism"
            />
          </a>
        </div>
        <div className="swiper-slide">
          <a
            href="https://www.gelato.network/"
            className="card card-body card-hover px-2 mx-2"
          >
            <img
              style={{
                width: 154,
                height: 80,
                objectFit: 'contain'
              }}
              src="logo-gelato.svg"
              className="d-block mx-auto my-2"
              alt="Gelato"
            />
          </a>
        </div>
        <div className="swiper-slide">
          <a
            href="https://lisk.com"
            className="card card-body card-hover px-2 mx-2"
          >
            <img
              style={{
                width: 154,
                height: 80,
                objectFit: 'contain'
              }}
              src="logo-lisk.svg"
              className="d-block mx-auto my-2"
              alt="Lisk"
            />
          </a>
        </div>
      </Swiper>

      <div id="swiper-brands" />
    </Fragment>
  );
}
