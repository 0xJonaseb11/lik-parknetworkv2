import { Swiper, SwiperSlide } from 'swiper/react';

export default function SectionServices() {
  return (
    <section className="container py-5 mt-md-3 my-lg-5">
      <h2 className="h1 pt-xl-2 pb-4 mb-2 mb-lg-3">WePark Features</h2>
      <Swiper
        className="swiper"
        slidesPerView={1}
        spaceBetween={24}
        autoHeight={true}
        pagination={{
            el: '.swiper-pagination',
            clickable: true,
        }}
        breakpoints={{
            "500": {
                slidesPerView: 2,
            },
            "991": {
                slidesPerView: 3
            }
        }}
      >
        <div className="swiper-wrapper">
          <SwiperSlide>
            <div className="swiper-slide">
              <a href="#">
                <img
                  src="/feature1.jpg"
                  className="rounded-3"
                  alt="Image"
                />
              </a>
              <div className="pt-4">
                <h3 className="h4">For Guests</h3>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Convenient Booking: Easily find and reserve parking spots in advance, saving time and hassle.                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Find the amenities you need like EV charging, valet service and more.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Transparent Pricing: Clearly see pricing and availability, with no hidden fees or surprises.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Rewards and Incentives: Earn rewards and discounts for frequent parking, referrals, or other actions.
                  </li>
                </ul>
              </div>
               <a href="#" className="btn btn-link px-0">
                Learn more
                <i className="bx bx-right-arrow-alt fs-xl ms-2"></i>
              </a> 
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-slide">
              <a href="#">
                <img
                  src="feature2.jpg"
                  className="rounded-3"
                  alt="Image"
                />
              </a>
              <div className="pt-4">
                <h3 className="h4">For Parking Space Owners</h3>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Increased Occupancy: Attract more guests with a seamless booking experience and competitive pricing.                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Automated Management: Streamline parking operations, including payment processing and enforcement.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Data Insights: Access analytics and insights to optimize pricing, availability, and marketing strategies.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Security and Trust: Leverage blockchain technology for secure, tamper-proof transactions and smart contracts.
                  </li>
                </ul>
              </div>
              <a href="#" className="btn btn-link px-0">
                Learn more
                <i className="bx bx-right-arrow-alt fs-xl ms-2"></i>
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-slide">
              <a href="#">
                <img
                  src="feature3.jpg"
                  className="rounded-3"
                  alt="Image"
                />
              </a>
              <div className="pt-4">
                <h3 className="h4">For Investors</h3>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Decentralized Governance: Participate in a community-driven decision-making process, ensuring the DAO's growth and success.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Transparent and Secure: Rely on blockchain technology for tamper-proof, transparent, and secure transactions and governance.
                  </li>
                  <li className="d-flex align-items-center fs-sm mb-2">
                    <i className="bx bx-check fs-xl text-primary me-2"></i>
                    Diversified Portfolio: Expand your investment portfolio with a unique asset class in the web3 and decentralized phyiscal infrastructure (DePiN) space.                  </li>
                </ul>
              </div>
              <a href="#" className="btn btn-link px-0">
                Learn more
                <i className="bx bx-right-arrow-alt fs-xl ms-2"></i>
              </a>
            </div>
          </SwiperSlide>
        </div>

        <div className="swiper-pagination position-relative d-lg-none mt-5"></div>
      </Swiper>
    </section>
  );
}
