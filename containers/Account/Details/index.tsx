import { Fragment } from 'react';

import InputLabel from '../../../components/Input/InputLabel';
import Input from '../../../components/Input';

export default function AccountDetails() {
  return (
    <Fragment>
      <h1 className="h2 pt-xl-1 pb-3">Account Details</h1>
      <h2 className="h5 text-primary mb-4">Basic info</h2>
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

      <h2 className="h5 text-primary pt-1 pt-lg-3 my-4">Address</h2>
      <form className="needs-validation border-bottom pb-2 pb-lg-4" noValidate>
        <div className="row pb-2">
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="country">Country</InputLabel>
            <select
              id="country"
              className="form-select form-select-lg"
              required
            >
              <option value="" disabled>
                Choose country
              </option>
              <option value="Australia">Australia</option>
              <option value="Belgium">Belgium</option>
              <option value="Canada">Canada</option>
              <option value="Denmark">Denmark</option>
              <option value="USA" selected>
                USA
              </option>
            </select>
            <div className="invalid-feedback">Please choose your country!</div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="state">State</InputLabel>
            <select id="state" className="form-select form-select-lg" required>
              <option value="" disabled>
                Choose state
              </option>
              <option value="Arizona">Arizona</option>
              <option value="California">California</option>
              <option value="Iowa">Iowa</option>
              <option value="Florida" selected>
                Florida
              </option>
              <option value="Michigan">Michigan</option>
              <option value="Texas">Texas</option>
            </select>
            <div className="invalid-feedback">Please choose your state!</div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="city">City</InputLabel>
            <select id="city" className="form-select form-select-lg" required>
              <option value="" disabled>
                Choose city
              </option>
              <option value="Boston">Boston</option>
              <option value="Chicago">Chicago</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Miami" selected>
                Miami
              </option>
              <option value="New York">New York</option>
              <option value="Philadelphia">Philadelphia</option>
            </select>
            <div className="invalid-feedback">Please choose your city!</div>
          </div>
          <div className="col-sm-6 mb-4">
            <InputLabel htmlFor="zip">ZIP code</InputLabel>
            <Input type="text" id="zip" required />
            <div className="invalid-feedback">Please enter your ZIP code!</div>
          </div>
          <div className="col-12 mb-4">
            <InputLabel htmlFor="address1">Address line 1</InputLabel>
            <Input type="text" id="address1" required />
          </div>
          <div className="col-12 mb-4">
            <InputLabel htmlFor="address2">
              Address line 2 <small className="text-muted">(optional)</small>
            </InputLabel>
            <Input type="text" id="address2" />
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

      <h2 className="h5 text-primary pt-1 pt-lg-3 mt-4">Delete account</h2>
      <p>
        When you delete your account, your public profile will be deactivated
        immediately. If you change your mind before the 14 days are up, sign in
        with your email and password, and we’ll send you a link to reactivate
        your account.
      </p>
      <div className="form-check mb-4">
        <Input
          type="checkbox"
          id="delete-account"
          className="form-check-Input"
        />
        <InputLabel
          htmlFor="delete-account"
          className="form-check-InputLabel fs-base"
        >
          Yes, I want to delete my account
        </InputLabel>
      </div>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </Fragment>
  );
}
