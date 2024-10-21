import { Swiper, SwiperSlide } from 'swiper/react';

export default function SectionClients() {
  return (
    <section className="container pb-5 mb-2 mb-md-4 mb-xl-5">
      <div className="row">
        <div className="col-md-5 mb-4 mb-md-0">
          <div className="card justify-content-center bg-dark h-100 p-4 p-lg-5">
            <div className="p-2">
              <h3 className="display-4 text-primary mb-1">200+</h3>
              <h2 className="text-light pb-5 mb-2">Clients Already Served</h2>
              <a
                href="#"
                className="d-inline-flex align-items-center rounded-3 text-decoration-none py-3 px-4"
                style={{ backgroundColor: '#3e4265' }}
              >
                <div className="pe-3">
                  <div className="fs-xs text-light text-uppercase opaciy-70 mb-2">
                    Reviewed on
                  </div>
                  <img
                    src="https://silicon.createx.studio/assets/img/about/clutch-logo.svg"
                    width="97"
                    alt="Clutch"
                  />
                </div>
                <div className="ps-1">
                  <div className="text-nowrap mb-2">
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                  </div>
                  <div className="text-light opacity-70">49 reviews</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4 p-xxl-5">
            <div className="d-flex justify-content-between pb-4 mb-2">
              <span className="btn btn-icon btn-primary btn-lg shadow-primary pe-none">
                <i className="bx bxs-quote-left"></i>
              </span>
              <div className="d-flex">
                <button
                  type="button"
                  id="prev"
                  className="btn btn-prev btn-icon btn-sm me-2"
                  aria-label="Previous"
                >
                  <i className="bx bx-chevron-left"></i>
                </button>
                <button
                  type="button"
                  id="next"
                  className="btn btn-next btn-icon btn-sm ms-2"
                  aria-label="Next"
                >
                  <i className="bx bx-chevron-right"></i>
                </button>
              </div>
            </div>

            <Swiper
              className="swiper mx-0 mb-md-n2 mb-xxl-n3"
              spaceBetween={24}
              // loop={true}
              pagination={{
                clickable: true,
                el: '.card-pagination'
              }}
              navigation={{
                prevEl: '#prev',
                nextEl: '#next'
              }}
            >
              <div className="slider-wrapper">
                <SwiperSlide>
                  <figure className="card h-100 position-relative border-0 bg-transparent">
                    <blockquote className="card-body p-0 mb-0">
                      <p className="fs-lg mb-0">
                        Dolor, a eget elementum, integer nulla volutpat, nunc,
                        sit. Quam iaculis varius mauris magna sem. Egestas sed
                        sed suscipit dolor faucibus dui imperdiet at eget.
                        Tincidunt imperdiet quis hendrerit aliquam feugiat neque
                        cras sed. Dictum quam integer volutpat tellus, faucibus
                        platea. Pulvinar turpis proin faucibus at mauris.
                        Sagittis gravida vitae porta enim.
                      </p>
                    </blockquote>
                    <figcaption className="card-footer border-0 d-flex align-items-center w-100 pb-2">
                      <img
                        src="https://silicon.createx.studio/assets/img/avatar/05.jpg"
                        width="48"
                        className="rounded-circle"
                        alt="Ralph Edwards"
                      />
                      <div className="ps-3">
                        <h5 className="fw-semibold lh-base mb-0">
                          Ralph Edwards
                        </h5>
                        <span className="fs-sm text-muted">
                          Head of Marketing at Lorem Company
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              </div>
              <div className="slider-wrapper">
                <SwiperSlide>
                  <figure className="card h-100 position-relative border-0 bg-transparent">
                    <blockquote className="card-body p-0 mb-0">
                      <p className="fs-lg mb-0">
                        Lorem, a eget elementum, integer nulla volutpat, nunc,
                        sit. Quam iaculis varius mauris magna sem. Egestas sed
                        sed suscipit dolor faucibus dui imperdiet at eget.
                        Tincidunt imperdiet quis hendrerit aliquam feugiat neque
                        cras sed. Dictum quam integer volutpat tellus, faucibus
                        platea. Pulvinar turpis proin faucibus at mauris.
                        Sagittis gravida vitae porta enim.
                      </p>
                    </blockquote>
                    <figcaption className="card-footer border-0 d-flex align-items-center w-100 pb-2">
                      <img
                        src="https://silicon.createx.studio/assets/img/avatar/05.jpg"
                        width="48"
                        className="rounded-circle"
                        alt="Ralph Edwards"
                      />
                      <div className="ps-3">
                        <h5 className="fw-semibold lh-base mb-0">
                          Ralph Edwards
                        </h5>
                        <span className="fs-sm text-muted">
                          Head of Marketing at Lorem Company
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              </div>
              <div className="card-pagination position-relative pt-3 mt-4"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
