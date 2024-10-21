import { Fragment } from 'react';

export default function AccountSecurity() {
  return (
    <Fragment>
      <h1 className="h2 pt-xl-1 pb-3">Security</h1>
      <h2 className="h5 text-primary mb-4">Password</h2>
      <form className="needs-validation border-bottom pb-3 pb-lg-4" noValidate>
        <div className="row">
          <div className="col-sm-6 mb-4">
            <label htmlFor="cp" className="form-label fs-base">
              Current password
            </label>
            <div className="password-toggle">
              <input
                type="password"
                id="cp"
                className="form-control form-control-lg"
                value="jonnyPass"
                required
              />
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input className="password-toggle-check" type="checkbox" />
                <span className="password-toggle-indicator"></span>
              </label>
              <div className="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-2">
          <div className="col-sm-6 mb-4">
            <label htmlFor="np" className="form-label fs-base">
              New password
            </label>
            <div className="password-toggle">
              <input
                type="password"
                id="np"
                className="form-control form-control-lg"
                required
              />
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input className="password-toggle-check" type="checkbox" />
                <span className="password-toggle-indicator"></span>
              </label>
              <div className="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-4">
            <label htmlFor="cnp" className="form-label fs-base">
              Confirm new password
            </label>
            <div className="password-toggle">
              <input
                type="password"
                id="cnp"
                className="form-control form-control-lg"
                required
              />
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input className="password-toggle-check" type="checkbox" />
                <span className="password-toggle-indicator"></span>
              </label>
              <div className="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mb-3">
          <button type="reset" className="btn btn-secondary me-3">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>

      <h2 className="h5 text-primary pt-1 pt-lg-3 mt-4">Your sessions</h2>
      <p className="pb-3 mb-3">
        This is a list of devices that have logged into your account. Remove any
        sessions that you do not recognize.
      </p>
      <ul className="list-unstyled mb-0">
        <li className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-start me-3">
            <div className="bg-secondary rounded-1 p-2">
              <i className="bx bx-desktop fs-xl text-primary d-block"></i>
            </div>
            <div className="ps-3">
              <div className="fw-medium text-nav mb-1">Mac – New York, USA</div>
              <span className="d-inline-block fs-sm text-muted border-end pe-2 me-2">
                Chrome
              </span>
              <span className="badge bg-success shadow-success">
                Active now
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary px-3 px-sm-4"
          >
            <i className="bx bx-x fs-xl ms-sm-n1 me-sm-1"></i>
            <span className="d-none d-sm-inline">Remove</span>
          </button>
        </li>
        <li className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-start me-3">
            <div className="bg-secondary rounded-1 p-2">
              <i className="bx bx-mobile fs-xl text-primary d-block"></i>
            </div>
            <div className="ps-3">
              <div className="fw-medium text-nav mb-1">
                Iphone 12 – New York, USA
              </div>
              <span className="d-inline-block fs-sm text-muted border-end pe-2 me-2">
                Silicon App
              </span>
              <span className="d-inline-block fs-sm text-muted">
                20 hours ago
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary px-3 px-sm-4"
          >
            <i className="bx bx-x fs-xl ms-sm-n1 me-sm-1"></i>
            <span className="d-none d-sm-inline">Remove</span>
          </button>
        </li>
        <li className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-start me-3">
            <div className="bg-secondary rounded-1 p-2">
              <i className="bx bx-desktop fs-xl text-primary d-block"></i>
            </div>
            <div className="ps-3">
              <div className="fw-medium text-nav mb-1">
                Windows 10.1 – New York, USA
              </div>
              <span className="d-inline-block fs-sm text-muted border-end pe-2 me-2">
                Chrome
              </span>
              <span className="d-inline-block fs-sm text-muted">
                November 15 at 8:42 am
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary px-3 px-sm-4"
          >
            <i className="bx bx-x fs-xl ms-sm-n1 me-sm-1"></i>
            <span className="d-none d-sm-inline">Remove</span>
          </button>
        </li>
      </ul>
    </Fragment>
  );
}
