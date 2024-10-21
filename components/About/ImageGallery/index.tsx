'use client';

import { Fragment, useState } from 'react';
import Row from '../../Layout/Row';

export default function ImageGallery() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Row className="gallery g-4" data-video="true" data-thumbnails="true">
      {showModal && (
        <Fragment>
          <div
            className="w-screen h-screen fixed top-0 left-0"
            style={{
              zIndex: 998,
              backgroundColor: 'rgba(0, 0, 0, .5)',
              top: 0,
              margin: 0
            }}
            onClick={closeModal}
          ></div>
          <div
            className="p-8 bg-white shadow"
            style={{
              position: 'fixed',
              width: '70vw',
              height: '70vh',
              zIndex: 999,
              backgroundColor: 'red',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '16px'
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/gWpQv6UOsJA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </Fragment>
      )}

      <div className="col-md-5">
        <a
          href="https://youtu.be/gWpQv6UOsJA"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className="gallery-item video-item is-hovered rounded-3"
          data-sub-html='<h6 className="fs-sm text-light">Oak Park Parking</h6>'
        >
          <img
            src="arialshot.png"
            alt="Oak Park Parking"
          />
          <div className="gallery-item-caption p-4">
            <h4 className="text-light mb-1">WePark Site #001</h4>
            <p className="mb-0">Oak Park Parking</p>
          </div>
        </a>
      </div>
      <div className="col-md-3 col-sm-5">
        <a
          href="https://weparknetwork.com/about-1.jpg"
          className="gallery-item rounded-3 mb-4"
          data-sub-html='<h6 className="fs-sm text-light">Oak Park Parking under construction</h6>'
        >
          <img
            src="https://weparknetwork.com/about-1.jpeg"
            alt="Gallery thumbnail"
          />
          <div className="gallery-item-caption fs-sm fw-medium">
            Oak Park Parking under construction
          </div>
        </a>
        <a
          href="/about-2.jpg"
          className="gallery-item rounded-3"
          data-sub-html='<h6 className="fs-sm text-light">Oak Park Parking under construction</h6>'
        >
          <img
            src="https://weparknetwork.com/about-2.jpeg"
            alt="Gallery thumbnail"
          />
          <div className="gallery-item-caption fs-sm fw-medium">
          Oak Park Parking under construction
          </div>
        </a>
      </div>
      <div className="col-md-4 col-sm-7">
        <a
          href="https://weparknetwork.com/about-3.jpg"
          className="gallery-item rounded-3 mb-4"
          data-sub-html='<h6 className="fs-sm text-light">Oak Park Parking under construction</h6>'
        >
          <img
            src="https://weparknetwork.com/about-3.jpeg"
            alt="Gallery thumbnail"
          />
          <div className="gallery-item-caption fs-sm fw-medium">
          Oak Park Parking under construction
          </div>
        </a>
        <a
          href="https://weparknetwork.com/about-4.jpg"
          className="gallery-item rounded-3"
          data-sub-html='<h6 className="fs-sm text-light">Oak Park Parking under construction</h6>'
        >
          <img
            src="https://weparknetwork.com/about-4.jpeg"
            alt="Gallery thumbnail"
          />
          <div className="gallery-item-caption fs-sm fw-medium">
          Oak Park Parking under construction
          </div>
        </a>
      </div>
    </Row>
  );
}
