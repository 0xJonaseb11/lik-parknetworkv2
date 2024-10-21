import { Swiper, SwiperSlide } from 'swiper/react';

export default function SectionNews() {
  return (
    <section className="bg-secondary py-5">
      <div className="container py-2 py-md-4 py-lg-5">
        <h2 className="h1 text-center pb-4 mb-1 mb-lg-3">Latest News</h2>
        <div className="position-relative px-xl-5">
          <button
            type="button"
            id="prev-news"
            className="btn btn-prev btn-icon btn-sm position-absolute top-50 start-0 translate-middle-y d-none d-xl-inline-flex"
            aria-label="Previous"
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            type="button"
            id="next-news"
            className="btn btn-next btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y d-none d-xl-inline-flex"
            aria-label="Next"
          >
            <i className="bx bx-chevron-right"></i>
          </button>

          <div className="px-xl-2">
            <Swiper
              className="swiper mx-n2"
              slidesPerView={1}
              loop
              pagination={{
                el: '.swiper-pagination',
                clickable: true
              }}
              navigation={{
                prevEl: '#prev-news',
                nextEl: '#next-news'
              }}
              breakpoints={{
                '500': {
                  slidesPerView: 2
                },
                '1000': {
                  slidesPerView: 3
                }
              }}
            >
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide h-auto pb-3">
                  <article className="card h-100 border-0 shadow-sm mx-2">
                    <div className="position-relative">
                      <a
                        href="#"
                        className="position-absolute top-0 start-0 w-100 h-100"
                        aria-label="Read more"
                      ></a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-5 me-3 mt-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title="Read later"
                        aria-label="Read later"
                      >
                        <i className="bx bx-bookmark"></i>
                      </a>
                      <img
                        src="https://silicon.createx.studio/assets/img/landing/financial/news/01.jpg"
                        className="card-img-top"
                        alt="Image"
                      />
                    </div>
                    <div className="card-body pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <a
                          href="#"
                          className="badge fs-sm text-nav bg-secondary text-decoration-none"
                        >
                          Business
                        </a>
                        <span className="fs-sm text-muted">12 hours ago</span>
                      </div>
                      <h3 className="h5 mb-0">
                        <a href="#">How agile is your forecasting process?</a>
                      </h3>
                    </div>
                    <div className="card-footer py-4">
                      <a
                        href="#"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <img
                          src="https://silicon.createx.studio/assets/img/avatar/40.jpg"
                          className="rounded-circle"
                          width="48"
                          alt="Avatar"
                        />
                        <div className="ps-3">
                          <h6 className="fs-base fw-semibold mb-0">
                            Marvin McKinney
                          </h6>
                          <span className="fs-sm text-muted">
                            Deputy Director, Capital Department
                          </span>
                        </div>
                      </a>
                    </div>
                  </article>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide h-auto pb-3">
                  <article className="card h-100 border-0 shadow-sm mx-2">
                    <div className="position-relative">
                      <a
                        href="#"
                        className="position-absolute top-0 start-0 w-100 h-100"
                        aria-label="Read more"
                      ></a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-5 me-3 mt-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title="Read later"
                        aria-label="Read later"
                      >
                        <i className="bx bx-bookmark"></i>
                      </a>
                      <img
                        src="https://silicon.createx.studio/assets/img/landing/financial/news/02.jpg"
                        className="card-img-top"
                        alt="Image"
                      />
                    </div>
                    <div className="card-body pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <a
                          href="#"
                          className="badge fs-sm text-nav bg-secondary text-decoration-none"
                        >
                          Enterprise
                        </a>
                        <span className="fs-sm text-muted">1 day ago</span>
                      </div>
                      <h3 className="h5 mb-0">
                        <a href="#">
                          A future with high public debt: low-for-long is not
                          low forever
                        </a>
                      </h3>
                    </div>
                    <div className="card-footer py-4">
                      <a
                        href="#"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <img
                          src="https://silicon.createx.studio/assets/img/avatar/04.jpg"
                          className="rounded-circle"
                          width="48"
                          alt="Avatar"
                        />
                        <div className="ps-3">
                          <h6 className="fs-base fw-semibold mb-0">
                            Jenny Wilson
                          </h6>
                          <span className="fs-sm text-muted">
                            Financial Sector Expert
                          </span>
                        </div>
                      </a>
                    </div>
                  </article>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide h-auto pb-3">
                  <article className="card h-100 border-0 shadow-sm mx-2">
                    <div className="position-relative">
                      <a
                        href="#"
                        className="position-absolute top-0 start-0 w-100 h-100"
                        aria-label="Read more"
                      ></a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-5 me-3 mt-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title="Read later"
                        aria-label="Read later"
                      >
                        <i className="bx bx-bookmark"></i>
                      </a>
                      <img
                        src="https://silicon.createx.studio/assets/img/landing/financial/news/03.jpg"
                        className="card-img-top"
                        alt="Image"
                      />
                    </div>
                    <div className="card-body pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <a
                          href="#"
                          className="badge fs-sm text-nav bg-secondary text-decoration-none"
                        >
                          Finance
                        </a>
                        <span className="fs-sm text-muted">Nov 24, 2023</span>
                      </div>
                      <h3 className="h5 mb-0">
                        <a href="#">
                          Understanding the rise in long-term rates
                        </a>
                      </h3>
                    </div>
                    <div className="card-footer py-4">
                      <a
                        href="#"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <img
                          src="https://silicon.createx.studio/assets/img/avatar/05.jpg"
                          className="rounded-circle"
                          width="48"
                          alt="Avatar"
                        />
                        <div className="ps-3">
                          <h6 className="fs-base fw-semibold mb-0">
                            Albert Flores
                          </h6>
                          <span className="fs-sm text-muted">
                            Financial Counsellor and Director
                          </span>
                        </div>
                      </a>
                    </div>
                  </article>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide h-auto pb-3">
                  <article className="card h-100 border-0 shadow-sm mx-2">
                    <div className="position-relative">
                      <a
                        href="#"
                        className="position-absolute top-0 start-0 w-100 h-100"
                        aria-label="Read more"
                      ></a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-5 me-3 mt-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title="Read later"
                        aria-label="Read later"
                      >
                        <i className="bx bx-bookmark"></i>
                      </a>
                      <img
                        src="https://silicon.createx.studio/assets/img/landing/financial/news/04.jpg"
                        className="card-img-top"
                        alt="Image"
                      />
                    </div>
                    <div className="card-body pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <a
                          href="#"
                          className="badge fs-sm text-nav bg-secondary text-decoration-none"
                        >
                          Ticks &amp; Trips
                        </a>
                        <span className="fs-sm text-muted">Oct 13, 2023</span>
                      </div>
                      <h3 className="h5 mb-0">
                        <a href="#">
                          Stocks making the biggest moves after hours
                        </a>
                      </h3>
                    </div>
                    <div className="card-footer py-4">
                      <a
                        href="#"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <img
                          src="https://silicon.createx.studio/assets/img/avatar/41.jpg"
                          className="rounded-circle"
                          width="48"
                          alt="Avatar"
                        />
                        <div className="ps-3">
                          <h6 className="fs-base fw-semibold mb-0">
                            Jerome Bell
                          </h6>
                          <span className="fs-sm text-muted">
                            Business Analyst
                          </span>
                        </div>
                      </a>
                    </div>
                  </article>
                </SwiperSlide>
              </div>

              <div className="swiper-pagination position-relative bottom-0 mt-4 mb-lg-2"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
