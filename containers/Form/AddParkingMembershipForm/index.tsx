import { ChangeEvent, useState } from 'react';
import FormControl from '../../../components/Form/FormControl';
import InputLabel from '../../../components/Input/InputLabel';
import FlexBox from '../../../components/Layout/FlexBox';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from '../../../utils/classnames';
import Input from '../../../components/Input';

type ParkingMembershipFields = {
  firstName: string;
  lastName: string;
  address: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  agreeToTerms: boolean;
};

const parkingMembershipSchema = Joi.object<ParkingMembershipFields>({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  address: Joi.string().required().label('Address'),
  unit: Joi.string().required().label('Unit / Apt'),
  city: Joi.string().required().label('City'),
  state: Joi.string().required().label('State'),
  zip: Joi.string().required().label('Zip'),
  agreeToTerms: Joi.boolean().valid(true).required()
});

export default function AddParkingMembershipForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ParkingMembershipFields>({
    resolver: joiResolver(parkingMembershipSchema),
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<ParkingMembershipFields> = (fieldValues) => {
    // Handle Form Submission here
  };

  console.log(errors, 'errors');

  return (
    <div className="col-xl-6 col-lg-7 offset-xl-2">
      <div className="card border-light shadow-lg py-3 p-sm-4 p-md-5">
        <div className="bg-dark position-absolute top-0 start-0 w-100 h-100 rounded-3 d-none d-dark-mode-block"></div>
        <div className="card-body position-relative zindex-2">
          <h2 className="card-title pb-3 mb-4">Parking Membership</h2>
          <p>Park anywhere on the WePark Network at a discounted rate for only $100</p>
          <form
            className="row g-4 needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-12 pt-2 pt-sm-3">
              <button
                type="button"
                className="btn btn-lg btn-primary w-100 w-sm-auto"
              >
                <i className="bx bx-wallet mr-2"></i>
                Connect Wallet
              </button>
            </div>

            <FlexBox className="gap-2">
              <FormControl>
                <InputLabel
                  htmlFor="firstName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.firstName
                  })}
                >
                  First Name
                </InputLabel>
                <input
                  {...register('firstName')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.firstName
                  })}
                  id="firstName"
                  placeholder="Enter first name"
                />
              </FormControl>

              <FormControl>
                <InputLabel
                  htmlFor="lastName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.lastName
                  })}
                >
                  <span>Last Name</span>
                </InputLabel>
                <input
                  {...register('lastName')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.lastName
                  })}
                  id="lastName"
                  placeholder="Enter last name"
                />
              </FormControl>
            </FlexBox>

            <FlexBox className="gap-2">
              <FormControl>
                <InputLabel
                  htmlFor="address"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.address
                  })}
                >
                  Address
                </InputLabel>
                <input
                  {...register('address')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.address
                  })}
                  id="address"
                  placeholder="Enter address"
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="unit"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.unit
                  })}
                >
                  Unit / Apt
                </InputLabel>
                <input
                  {...register('unit')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.unit
                  })}
                  id="unit"
                  placeholder="Enter Unit / Apt"
                />
              </FormControl>
            </FlexBox>

            <FlexBox className="gap-2">
              <FormControl>
                <InputLabel
                  htmlFor="city"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.city
                  })}
                >
                  City
                </InputLabel>
                <input
                  {...register('city')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.city
                  })}
                  id="city"
                  placeholder="Enter city"
                />
              </FormControl>

              <FormControl>
                <InputLabel
                  htmlFor="state"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.state
                  })}
                >
                  State
                </InputLabel>
                <input
                  {...register('state')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.state
                  })}
                  id="state"
                  placeholder="Enter state"
                />
              </FormControl>

              <FormControl>
                <InputLabel
                  htmlFor="zip"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.zip
                  })}
                >
                  Zip
                </InputLabel>
                <input
                  {...register('zip')}
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.zip
                  })}
                  id="zip"
                  placeholder="Enter zip"
                />
              </FormControl>
            </FlexBox>

            <div className="form-check mb-4">
              <Input
                {...register('agreeToTerms')}
                type="checkbox"
                id="delete-account"
                className="form-check-Input mr-2"
              />
              <InputLabel
                htmlFor="delete-account"
                className={classNames('form-check-InputLabel fs-base', {
                  'text-red-500': !!errors.agreeToTerms
                })}
              >
                I have read and agree to the <a>terms of service</a>
              </InputLabel>
            </div>

            <div className="col-12 pt-2 pt-sm-3">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-100 w-full"
              >
                Become a Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
