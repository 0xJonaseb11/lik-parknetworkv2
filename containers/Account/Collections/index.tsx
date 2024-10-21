import { Fragment } from 'react';

export default function Collections() {
  return (
    <Fragment>
      <div className="d-sm-flex align-items-center justify-content-between pt-xl-1 mb-3 pb-3">
        <h1 className="h2 mb-sm-0">My Collections</h1>
        <select className="form-select" style={{ maxWidth: '15rem' }}>
          <option value="Published">Published</option>
          <option value="Category">Category</option>
          <option value="Title AZ">Title AZ</option>
          <option value="Title ZA">Title ZA</option>
        </select>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden mb-4">
        <div className="row g-0">
          <a
            href="#"
            className="col-sm-4 bg-repeat-0 bg-position-center bg-size-cover"
            style={{
              backgroundImage: 'url(https://silicon.createx.studio/assets/img/account/collection01.jpg)',
              minHeight: '13rem'
            }}
            aria-label="Cover image"
          ></a>
          <div className="col-sm-8">
            <div className="card-body">
              <div className="fs-sm text-muted mb-1">Nov 30, 2023</div>
              <h2 className="h4 pb-1 mb-2">
                <a href="#">3D Shape Illustration</a>
              </h2>
              <p className="mb-4 mb-lg-5">
                NFT / Graphic Design / Motion Design
              </p>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-edit fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Edit</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-power-off fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Deactivate</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger px-3 px-lg-4"
                >
                  <i className="bx bx-trash-alt fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden mb-4">
        <div className="row g-0">
          <a
            href="#"
            className="col-sm-4 bg-repeat-0 bg-position-center bg-size-cover"
            style={{
              backgroundImage: 'url(https://silicon.createx.studio/assets/img/account/collection02.jpg)',
              minHeight: '13rem'
            }}
            aria-label="Cover image"
          ></a>
          <div className="col-sm-8">
            <div className="card-body">
              <div className="fs-sm text-muted mb-1">Oct 18, 2023</div>
              <h2 className="h4 pb-1 mb-2">
                <a href="#">
                  Scene of Sunglasses &amp; Headphone on Human Head
                </a>
              </h2>
              <p className="mb-4 mb-lg-5">
                Graphic Design / Art / Identity / Motion Design
              </p>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-edit fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Edit</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-power-off fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Deactivate</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger px-3 px-lg-4"
                >
                  <i className="bx bx-trash-alt fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden mb-4">
        <div className="row g-0">
          <a
            href="#"
            className="col-sm-4 bg-repeat-0 bg-position-center bg-size-cover"
            style={{
              backgroundImage: 'url(https://silicon.createx.studio/assets/img/account/collection03.jpg)',
              minHeight: '13rem'
            }}
            aria-label="Cover image"
          ></a>
          <div className="col-sm-8">
            <div className="card-body">
              <div className="fs-sm text-muted mb-1">Aug 05, 2023</div>
              <h2 className="h4 pb-1 mb-2">
                <a href="#">Mannequin Hands Holding Phone</a>
              </h2>
              <p className="mb-4 mb-lg-5">
                NFT / Mobile App Design / Graphic Design / Art
              </p>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-edit fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Edit</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3 px-lg-4 me-3"
                >
                  <i className="bx bx-power-off fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Deactivate</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger px-3 px-lg-4"
                >
                  <i className="bx bx-trash-alt fs-xl me-xl-2"></i>
                  <span className="d-none d-xl-inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
