import Lottie from 'react-lottie-player';

import lottieAnimation from './lottieAnimation.json';

export default function SectionBanner() {
  return (
    <section className="container">
      <div
        className="card bg-white border-primary shadow-sm px-4 px-lg-0"
        data-bs-theme="light"
      >
        <div className="row align-items-center py-3">
          <div className="col-xl-5 col-md-6 offset-lg-1 text-center text-md-start py-4 py-lg-5">
            <h2 className="h1">Learn more about DePiN</h2>
            <h3 className="h4 text-primary">
              Decentralized Physical Infrastructure Network 
            </h3>
            <p className="mb-4 mb-lg-5">
            DePiN is a web3 term that refers to a revolutionary concept of decentralized, community-driven physical infrastructure. WePark utilizes this concept to create a transparent, secure, and efficient experience for parking lot owners, guests, and investors, and pave the way for a new generation of physical infrastructure management.
            </p>
            
          </div>
          <div className="col-xl-6 col-lg-5 col-md-6">
            <Lottie
              className="mx-auto"
              speed={1}
              style={{ maxWidth: '416px', background: 'transparent' }}
              animationData={lottieAnimation}
              loop
              play
            />
          </div>
        </div>
      </div>
    </section>
  );
}
