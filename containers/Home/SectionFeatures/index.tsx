import { Swiper, SwiperSlide } from 'swiper/react';

export default function SectionFeatures() {
  return (
    <section className="container py-5 my-2 my-md-4 my-lg-5">
      <h2 className="h1 text-center pt-1 pt-xl-3 mb-lg-4">Why Us?</h2>
      <Swiper
        className="swiper mx-n2"
        slidesPerView={1}
        spaceBetween={8}
        pagination={{
          el: '.swiper-pagination',
          clickable: true
        }}
        breakpoints={{
          '500': {
            slidesPerView: 2
          },
          '600': {
            slidesPerView: 3
          },
          '1200': {
            slidesPerView: 4
          }
        }}
      >
        <div className="swiper-wrapper">
          <SwiperSlide className="swiper-slide h-auto py-3">
            <div className="card h-100 card-body card-hover mx-2">
              <i
                className="bx bx-rocket display-5 fw-normal card-icon"
                style={{ color: '#b4b7c9' }}
              ></i>
              <h3 className="h5 pt-3 pb-1 mb-2">Innovative Solutions</h3>
              <p className="mb-0">
                Massa enim libero dictumst consectetur in convallis. Lobortis
                cursus mi a magna ullamcorper consectetur.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide h-auto py-3">
            <div className="card h-100 card-body card-hover mx-2">
              <i
                className="bx bx-like display-5 fw-normal card-icon"
                style={{ color: '#b4b7c9' }}
              ></i>
              <h3 className="h5 pt-3 pb-1 mb-2">Success Guarantee</h3>
              <p className="mb-0">
                At ultricies id non quisque integer eget velit. Facilisis enim
                malesuada metus, risus amet ultricies. Magna aliquam id nunc.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide h-auto py-3">
            <div className="card h-100 card-body card-hover mx-2">
              <i
                className="bx bx-time-five display-5 fw-normal card-icon"
                style={{ color: '#b4b7c9' }}
              ></i>
              <h3 className="h5 pt-3 pb-1 mb-2">On Time Service</h3>
              <p className="mb-0">
                Nisi augue at ridiculus odio ullamcorper in id. In bibendum diam
                nunc dignissim magna morbi mattis enim.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide h-auto py-3">
            <div className="card h-100 card-body card-hover mx-2">
              <i
                className="bx bx-group display-5 fw-normal card-icon"
                style={{ color: '#b4b7c9' }}
              ></i>
              <h3 className="h5 pt-3 pb-1 mb-2">Professional Team</h3>
              <p className="mb-0">
                Pellentesque rhoncus viverra vestibulum, purus purus quisque
                quisque sed. Cras vestibulum facilisis dictumst consequat.
              </p>
            </div>
          </SwiperSlide>
        </div>

        <div className="swiper-pagination position-relative d-xl-none pt-3 mt-4"></div>
      </Swiper>
      <div className="d-flex flex-column flex-sm-row justify-content-center pt-3 pt-sm-4">
        <a href="#" className="btn btn-primary shadow-primary btn-lg">
          Request a price
        </a>
      </div>
    </section>
  );
}
