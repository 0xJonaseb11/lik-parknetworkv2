'use client';

import AddParkingMembershipForm from '../../containers/Form/AddParkingMembershipForm';
import Row from '../../components/Layout/Row';
import React, { Fragment, useState } from 'react';
import AddParkingSpaceForm from '../../containers/Form/AddParkingSpaceForm';
import classNames from '../../utils/classnames';

enum FormType {
  ParkingMembership,
  ParkingSpace
}

export default function Page() {
  const [formType, setFormType] = useState<FormType>(
    FormType.ParkingMembership
  );

  const handleFormTypeChanged = (formType: FormType) => () =>
    setFormType(formType);

  const Form: React.FC<any> = {
    [FormType.ParkingMembership]: AddParkingMembershipForm,
    [FormType.ParkingSpace]: AddParkingSpaceForm
  }[formType];

  return (
    <Fragment>
      <section className="position-relative bg-secondary pt-5">
        <div className="container position-relative zindex-2 pt-5">
          <Row>
            <div className="col-xl-4 col-lg-5 pb-4 pb-sm-5 mb-2 mb-sm-0">
              <div className="pe-lg-4 pe-xl-0">
                <h1 className="pb-3 pb-md-4 mb-lg-5">Join WePark</h1>
                <div
                  className={classNames(
                    'd-flex align-items-start pb-3 mb-sm-1 mb-md-3 p-2 rounded-xl',
                    { 'bg-blue-100': formType === FormType.ParkingMembership }
                  )}
                >
                  <div className="bg-light text-primary rounded-circle flex-shrink-0 fs-3 lh-1 p-3">
                    <i className="bx bx-envelope"></i>
                  </div>
                  <div className="ps-3 ps-sm-4">
                    <h3 className="h4 pb-1 mb-2">Parking Membership</h3>
                    <p className="mb-2">
                      WePark members get access to exclusive benefits and
                      discounted parking rates
                    </p>
                    <div
                      className="btn btn-link btn-lg px-0"
                      onClick={handleFormTypeChanged(
                        FormType.ParkingMembership
                      )}
                    >
                      Become a member
                      <i className="bx bx-right-arrow-alt lead ms-2"></i>
                    </div>
                  </div>
                </div>
                <div
                  className={classNames(
                    'd-flex align-items-start p-2 rounded-xl',
                    { 'bg-blue-100': formType === FormType.ParkingSpace }
                  )}
                >
                  <div className="bg-light text-primary rounded-circle flex-shrink-0 fs-3 lh-1 p-3">
                    <i className="bx bx-group"></i>
                  </div>
                  <div className="ps-3 ps-sm-4">
                    <h3 className="h4 pb-1 mb-2">Property Owners</h3>
                    <p className="mb-2">
                      Own a parking lot or space? Join our network and start
                      earning today
                    </p>
                    <div
                      className="btn btn-link btn-lg px-0"
                      onClick={handleFormTypeChanged(FormType.ParkingSpace)}
                    >
                      Add your parking spaces
                      <i className="bx bx-right-arrow-alt lead ms-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Form />
          </Row>
        </div>
        <div
          className="position-absolute bottom-0 start-0 w-100 bg-light"
          style={{ height: '8rem' }}
        ></div>
      </section>
    </Fragment>
  );
}
