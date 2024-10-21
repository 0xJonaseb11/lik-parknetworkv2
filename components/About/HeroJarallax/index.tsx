import Jarallax from "../../Jarallax";

export default function HeroJarallax() {
  return (
    <Jarallax
      className="d-none d-md-block"
      data-jarallax=""
      data-speed="0.35"
    >
      <span className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary-translucent"></span>

      <div className="d-none d-xxl-block" style={{ height: '700px' }}></div>
      <div
        className="d-none d-md-block d-xxl-none"
        style={{ height: '550px' }}
      ></div>
      <div
        id="jarallax-container-0"
        className="jarallax-container"
      >
        <div
          className="jarallax-img"
          style={{
            backgroundImage:
              'url(parking-solar-canopy.png)',
            objectFit: 'cover',
            objectPosition: 'center',
            maxWidth: 'none',
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            marginTop: '32.9px',
            transform: 'translate3d(0px, -6.3px, 0px)'
          }}
          data-jarallax-original-styles="background-image: url(parking-solar-canopy.png),"
        ></div>
      </div>
    </Jarallax>
  );
}
