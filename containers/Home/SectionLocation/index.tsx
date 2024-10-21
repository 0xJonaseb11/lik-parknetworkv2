import Link from 'next/link';
import PageSection from '../../../components/Layout/PageSection';
import useDisplayLocations from '../../../hooks/home/useDisplayLocations';
import { Fragment } from 'react';
import Row from '../../../components/Layout/Row';

export default function SectionLocation() {
  const locations = useDisplayLocations();
  return (
    <PageSection>
      <Row className="py-5">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="d-flex flex-column h-100 shadow-sm rounded-3 overflow-hidden">
            <iframe
              className="d-block h-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2971.265179501327!2d-87.7795776226487!3d41.865640766192016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e34827cd982a5%3A0xc9d01d60fe4ed16!2s6104%20Roosevelt%20Rd%2C%20Oak%20Park%2C%20IL%2060304!5e0!3m2!1sen!2sus!4v1712884990803!5m2!1sen!2sus"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen={false}
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1">
          <h2 className="h4 mb-4">Roosevelt &amp; Lyman</h2>
          {locations.map(({ location, phone, timings }, idx) => (
            <ul className="list-unstyled pb-2 pb-lg-0 mb-4 mb-lg-5" key={idx}>
              <li className="d-flex pb-1 mb-2">
                <i
                  className="bx bx-map text-primary fs-xl me-2"
                  style={{ marginTop: '.125rem' }}
                ></i>
                {location}
              </li>
              <li className="d-flex pb-1 mb-2">
                <i
                  className="bx bx-phone-call text-primary fs-xl me-2"
                  style={{ marginTop: '.125rem' }}
                ></i>
                {phone}
              </li>
              <li className="d-flex">
                <i
                  className="bx bx-time-five text-primary fs-xl me-2"
                  style={{ marginTop: '.125rem' }}
                ></i>
                <div>
                  {timings.map(({ period, openingTime, closingTime }, idx) => (
                    <Fragment key={idx}>
                      <strong className="text-nav">{period}</strong>:{' '}
                      {openingTime} -{closingTime}
                      {idx < timings.length - 1 && <br />}
                    </Fragment>
                  ))}
                </div>
              </li>
            </ul>
          ))}

          <div className="d-flex pt-1 pt-md-3 pt-xl-4">
            <Link
              href="#"
              className="btn btn-icon btn-secondary btn-facebook me-3"
              aria-label="Facebook"
            >
              <i className="bx bxl-facebook"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-secondary btn-instagram me-3"
              aria-label="Instagram"
            >
              <i className="bx bxl-instagram"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-secondary btn-twitter me-3"
              aria-label="Twitter"
            >
              <i className="bx bxl-twitter"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-secondary btn-youtube"
              aria-label="YouTube"
            >
              <i className="bx bxl-youtube"></i>
            </Link>
          </div>
        </div>
      </Row>
    </PageSection>
  );
}
