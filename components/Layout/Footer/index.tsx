import Image from 'next/image';
import Link from 'next/link';
import useFooterNavItems from '../../../hooks/useFooterNavItems';
import Row from '../Row';

export default function Footer() {
  const { pageNavItems, legalNavItems, socialNavItems } = useFooterNavItems();
  return (
    <footer
      className="footer bg-dark border-top border-light pt-5 pb-4 pb-lg-5"
      data-bs-theme="dark"
    >
      <div className="container pt-lg-4">
        <Row className="pb-5">
          <div className="col-lg-4 col-md-6">
            <div className="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
              <Image
                src="https://oakparkparking.com/assets/img/logo.svg"
                width="47"
                alt="Silicon"
                height="47"
              />
              WePark | Decentralized Parking
            </div>
            <p className="fs-sm text-light opacity-70 pb-lg-3 mb-4">
              WePark is a decentralized parking platform that aims to revolutionize the parking industry, providing a more efficient, convenient, and rewarding experience for all participants.

            </p>
            <form className="needs-validation" noValidate>
              <label htmlFor="subscr-email" className="form-label">
                Subscribe to our newsletter
              </label>
              <div className="input-group">
                <input
                  type="email"
                  id="subscr-email"
                  className="form-control rounded-start ps-5"
                  placeholder="Your email"
                  required
                />
                <i className="bx bx-envelope fs-lg text-muted position-absolute top-50 start-0 translate-middle-y ms-3 zindex-5"></i>
                <div className="invalid-tooltip position-absolute top-100 start-0">
                  Please provide Link valid email address.
                </div>
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
            <Row id="footer-links">
              <div className="col-lg-4">
                <h6 className="mb-2">
                  <Link
                    href="#useful-links"
                    className="d-block text-dark dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Useful Links
                  </Link>
                </h6>
                <div
                  id="useful-links"
                  className="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul className="nav flex-column pb-lg-1 mb-lg-3">
                    {pageNavItems?.map(({ title, href }) => (
                      <li className="nav-item" key={title}>
                        <Link
                          href={href}
                          className="nav-link d-inline-block px-0 pt-1 pb-2"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="nav flex-column mb-2 mb-lg-0">
                    {legalNavItems?.map(({ title, href }) => (
                      <li className="nav-item" key={title}>
                        <Link
                          href={href}
                          className="nav-link d-inline-block px-0 pt-1 pb-2"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-3">
                <h6 className="mb-2">
                  <Link
                    href="#social-links"
                    className="d-block text-dark dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Socials
                  </Link>
                </h6>
                <div
                  id="social-links"
                  className="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul className="nav flex-column mb-2 mb-lg-0">
                    {socialNavItems?.map(({ title, href }) => (
                      <li className="nav-item" key={title}>
                        <Link
                          href={href}
                          className="nav-link d-inline-block px-0 pt-1 pb-2"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                <h6 className="mb-2">Contact Us</h6>
                <Link href="mailto:email@example.com" className="fw-medium">
                  info@oakparkparking.com
                </Link>
              </div>
            </Row>
          </div>
        </Row>
        <p className="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
          <span className="text-light opacity-50">
            &copy; All rights reserved. Made by{' '}
          </span>
          <Link
            className="nav-link d-inline-block p-0"
            href="https://oakparkparking.com/"
            target="_blank"
            rel="noopener"
          >
            Park &amp; Charge, Inc.
          </Link>
        </p>
      </div>
    </footer>
  );
}
