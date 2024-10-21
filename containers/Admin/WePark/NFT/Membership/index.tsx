import { Fragment } from 'react';

import InputLabel from '../../../../../components/Input/InputLabel';
import Input from '../../../../../components/Input';

export default function MembershipNFT() {
  return (
    <Fragment>
      <h1 className="h2 pt-xl-1 pb-3">WePark Membership NFT</h1>
      {/* <h2 className="h5 text-primary mb-4">Basic info</h2> */}
      <form className="needs-validation border-bottom pb-3 pb-lg-4" noValidate>
        <div className="row pb-2">
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="fn">First name</InputLabel>
            <Input type="text" id="fn" value="John" required />
            <div className="invalid-feedback">
              Please enter your first name!
            </div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="sn">Second name</InputLabel>
            <Input type="text" id="sn" value="Doe" required />
            <div className="invalid-feedback">
              Please enter your second name!
            </div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input type="email" id="email" value="jonny@email.com" required />
            <div className="invalid-feedback">
              Please provide a valid email address!
            </div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="phone">
              Phone <small className="text-muted">(optional)</small>
            </InputLabel>
            <Input
              type="text"
              id="phone"
              data-format='{"numericOnly": true, "delimiters": ["+1 ", " ", " "], "blocks": [0, 3, 3, 2]}'
              placeholder="+1 ___ ___ __"
            />
          </div>
          <div className="col-12 mb-4">
            <InputLabel htmlFor="bio">
              Bio <small className="text-muted">(optional)</small>
            </InputLabel>
            <textarea
              id="bio"
              className="form-control form-control-lg"
              rows={4}
              placeholder="Add a short bio..."
            ></textarea>
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
    </Fragment>
  );
}
