import { Swiper, SwiperSlide } from 'swiper/react';

export default function SectionIndustries() {
  return (
    <section className="container pt-xl-3 pb-5">
      <h2 className="h1 text-center text-lg-start pb-4 mb-1 mb-lg-3">
        Industries We Serve
      </h2>
      <div className="row pb-2 pb-md-4 pb-lg-5">
        <div className="col-xl-4 col-lg-5 d-flex flex-column order-2 order-lg-1">
          <Swiper
            className="swiper mx-0 mb-md-n2 mb-xxl-n3"
            spaceBetween={30}
            loop
            autoHeight
            navigation={{
              prevEl: '#prev-industry',
              nextEl: '#next-industry'
            }}
          >
            <div className="swiper-wrapper text-center text-lg-start">
              <SwiperSlide
                className="swiper-slide"
                data-swiper-tab="#industry-1"
              >
                <h3 className="h4 mb-4">
                  <a
                    href="#"
                    className="nav-link justify-content-center justify-content-lg-start fw-bold p-0"
                  >
                    Transportation &amp; Logistics
                    <i className="bx bx-right-arrow-alt text-primary fs-3 fw-normal ms-2 mt-1"></i>
                  </a>
                </h3>
                <p>
                  Risus massa fames metus lectus diam maecenas dui. Nibh morbi
                  id purus eget tellus diam, integer blandit. Ac condimentum
                  a nisl sagittis, interdum. Et viverra maecenas quis cras sed
                  gravida volutpat, cursus enim. Enim ut nulla netus porta lacus
                  diam. Et enim ultrices nunc, nunc. In iaculis venenatis
                  at sit.
                </p>
              </SwiperSlide>

              <SwiperSlide
                className="swiper-slide"
                data-swiper-tab="#industry-2"
              >
                <h3 className="h4 mb-4">
                  <a
                    href="#"
                    className="nav-link justify-content-center justify-content-lg-start fw-bold p-0"
                  >
                    Construction &amp; Real Estate
                    <i className="bx bx-right-arrow-alt text-primary fs-3 fw-normal ms-2 mt-1"></i>
                  </a>
                </h3>
                <p>
                  Nunc, amet et, et at habitant. Eget quis justo, metus at metus
                  sapien. Urna quisque rutrum pharetra pulvinar vitae quam
                  blandit non. Orci tempor cursus egestas quis orci at nisi
                  maecenas. Enim in ultrices tortor, nibh quis sollicitudin
                  tellus non maecenas. In libero ut semper nunc magna tortor.
                </p>
              </SwiperSlide>

              <SwiperSlide
                className="swiper-slide"
                data-swiper-tab="#industry-3"
              >
                <h3 className="h4 mb-4">
                  <a
                    href="#"
                    className="nav-link justify-content-center justify-content-lg-start fw-bold p-0"
                  >
                    Education
                    <i className="bx bx-right-arrow-alt text-primary fs-3 fw-normal ms-2 mt-1"></i>
                  </a>
                </h3>
                <p>
                  Vivamus nisl sit volutpat laoreet ligula et. Nunc, duis est
                  justo, cras ipsum vulputate eget tellus augue. Amet, sagittis
                  ut enim nisl commodo, pharetra. Sapien imperdiet tristique
                  interdum aliquet varius vitae facilisis vel. Erat convallis
                  eget elit eget iaculis. Morbi id facilisis ligula odio sed
                  amet suspendisse duis aliquet. Justo quam convallis id sed.
                </p>
              </SwiperSlide>
            </div>
          </Swiper>

          <div className="d-flex justify-content-center justify-content-lg-start mt-2 mt-lg-auto">
            <button
              type="button"
              id="prev-industry"
              className="btn btn-prev btn-icon btn-sm me-2"
              aria-label="Previous"
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <button
              type="button"
              id="next-industry"
              className="btn btn-next btn-icon btn-sm ms-2"
              aria-label="Next"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="col-lg-7 offset-xl-1 order-1 order-lg-2 pt-lg-3 mt-lg-n5 mb-4 mb-lg-0">
          <div className="swiper-tabs mt-lg-n5">
            <div id="industry-1" className="swiper-tab active">
              <img
                src="https://silicon.createx.studio/assets/img/landing/financial/industries/01.jpg"
                className="rounded-3"
                alt="Image"
              />
            </div>

            <div id="industry-2" className="swiper-tab">
              <img
                src="https://silicon.createx.studio/assets/img/landing/financial/industries/02.jpg"
                className="rounded-3"
                alt="Image"
              />
            </div>

            <div id="industry-3" className="swiper-tab">
              <img
                src="https://silicon.createx.studio/assets/img/landing/financial/industries/03.jpg"
                className="rounded-3"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
