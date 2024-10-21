export default function SectionContact() {
  return (
    <section className="position-relative py-5">
      <div className="container position-relative zindex-5 py-2 py-md-4 py-lg-5">
        <div className="row justify-content-center text-center pt-xl-2 pb-4 mb-1 mb-lg-3">
          <div className="col-xl-6 col-lg-7 col-md-8 col-sm-11">
            <h2 className="mb-4">Let&apos;s Change the Game Together</h2>
            <p className="text-muted mb-0">
              Like what you have seen? Let&apos;s get started. Just fill in a
              few details and we will get in touch as soon as possible.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <form className="row needs-validation" noValidate>
              <div className="col-sm-6 mb-4">
                <label htmlFor="fn" className="form-label">
                  First name
                </label>
                <input type="text" id="fn" className="form-control" required />
                <div className="invalid-feedback">
                  Please, enter your first name!
                </div>
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="ln" className="form-label">
                  Last name
                </label>
                <input type="text" id="ln" className="form-control" required />
                <div className="invalid-feedback">
                  Please, enter your last name!
                </div>
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Please, provide a valid email address!
                </div>
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  data-format='{"numericOnly": true, "delimiters": ["+1 ", " ", " "], "blocks": [0, 3, 3, 2]}'
                  placeholder="+1 ___ ___ __"
                />
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <select id="city" className="form-select" required>
                  <option value="" disabled selected>
                    Choose city
                  </option>
                  <option value="Boston">Boston</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Miami">Miami</option>
                  <option value="New York">New York</option>
                  <option value="Philadelphia">Philadelphia</option>
                </select>
                <div className="invalid-feedback">
                  Please, choose your city!
                </div>
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="company" className="form-label">
                  Your company
                </label>
                <input type="text" id="company" className="form-control" />
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="position" className="form-label">
                  Your position
                </label>
                <select id="position" className="form-select">
                  <option value="Owner">Owner</option>
                  <option value="CEO">CEO</option>
                  <option value="Manager">Manager</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="people" className="form-label">
                  People in company
                </label>
                <select id="people" className="form-select">
                  <option value="0-10">0-10</option>
                  <option value="10-25">10-25</option>
                  <option value="25-50">25-50</option>
                  <option value="50-100">50-100</option>
                </select>
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows={4}
                  required
                ></textarea>
                <div className="invalid-feedback">
                  Please, enter your message!
                </div>
              </div>
              <div className="col-12 text-center pt-2 pt-md-3 pt-lg-4">
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary btn-lg"
                >
                  Send a request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="position-absolute end-0 bottom-0 text-primary">
        <svg
          width="469"
          height="343"
          viewBox="0 0 469 343"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.08"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M273.631 680.872C442.436 768.853 639.315 708.216 717.593 558.212C795.871 408.208 732.941 212.157 564.137 124.176C395.333 36.195 198.453 96.8326 120.175 246.836C41.8972 396.84 104.827 592.891 273.631 680.872ZM236.335 752.344C440.804 858.914 688.289 788.686 789.109 595.486C889.928 402.286 805.903 159.274 601.433 52.7043C396.964 -53.8654 149.479 16.3623 48.6595 209.562C-52.1598 402.762 31.8652 645.774 236.335 752.344Z"
            fill="currentColor"
          />
          <path
            opacity="0.08"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M298.401 633.404C434.98 704.59 598.31 656.971 664.332 530.451C730.355 403.932 675.946 242.827 539.367 171.642C402.787 100.457 239.458 148.076 173.435 274.595C107.413 401.114 161.822 562.219 298.401 633.404ZM288.455 652.464C434.545 728.606 611.369 678.429 683.403 540.391C755.437 402.353 695.402 228.725 549.312 152.583C403.222 76.4404 226.398 126.617 154.365 264.655C82.331 402.693 142.365 576.321 288.455 652.464Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
