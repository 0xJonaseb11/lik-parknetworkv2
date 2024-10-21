'use client';

import { ChangeEvent, useState } from 'react';
import FormControl from '../../../components/Form/FormControl';
import InputLabel from '../../../components/Input/InputLabel';
import FlexBox from '../../../components/Layout/FlexBox';
import Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import classNames from '../../../utils/classnames';
import Input from '../../../components/Input';

type ParkingSpaceFields = {
  additionType: string;
  ownerFirstName: string;
  ownerLastName: string;
  parkingLotName: string;
  parkingSpaceName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  agreeToTerms: boolean;
};

const parkingSpaceSchema = Joi.object<ParkingSpaceFields>({
  additionType: Joi.string().required().label('Addition Type'),
  ownerFirstName: Joi.string().required().label('Owner First Name'),
  ownerLastName: Joi.string().required().label('Owner Last Name'),
  parkingLotName: Joi.when('additionType', {
    is: 'parkingLot',
    then: Joi.string().required().label('Parking Lot Name'),
    otherwise: Joi.string().allow('').optional().label('Parking Lot Name')
  }),
  parkingSpaceName: Joi.when('additionType', {
    is: 'singleSpace',
    then: Joi.string().required().label('Parking Space Name'),
    otherwise: Joi.string().allow('').optional().label('Parking Space Name')
  }),
  address: Joi.string().required().label('Address'),
  city: Joi.string().required().label('City'),
  state: Joi.string().required().label('State'),
  zip: Joi.string().required().label('Zip'),
  agreeToTerms: Joi.boolean().valid(true).required()
});

export default function AddParkingSpaceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ParkingSpaceFields>({
    defaultValues: {
      additionType: 'parkingLot'
    },
    resolver: joiResolver(parkingSpaceSchema),
    mode: 'onBlur'
  });

  const additionType = watch('additionType');

  const onSubmit: SubmitHandler<ParkingSpaceFields> = (fieldValues) => {
    // Handle form submission here...
  };

  return (
    <div className="col-xl-6 col-lg-7 offset-xl-2">
      <div className="card border-light shadow-lg py-3 p-sm-4 p-md-5">
        <div className="bg-dark position-absolute top-0 start-0 w-100 h-100 rounded-3 d-none d-dark-mode-block"></div>
        <div className="card-body position-relative zindex-2">
          <h2 className="card-title pb-3 mb-4">
          Add your Parking {additionType === 'parkingLot' ? 'Lot' : 'Space'}
           to the WePark Network</h2> 
          <p>Earn passive income by listing your available space for rent</p>

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
            <FormControl className="col-12">
              <InputLabel
                htmlFor="additionType"
                className={classNames('form-InputLabel fs-base', {
                  'text-red-500': !!errors.additionType
                })}
              >
                Type of Addition
              </InputLabel>
              <select
                {...register('additionType')}
                className={classNames('form-select form-select-lg', {
                  'border-red-500 border-2': !!errors.additionType
                })}
                id="additionType"
              >
                <option value="" disabled>
                  Choose a type
                </option>
                <option value="parkingLot">Parking Lot</option>
                <option value="singleSpace">Single Space</option>
              </select>
              <div className="invalid-feedback">
                Choose a topic from the list!
              </div>
            </FormControl>
            <FlexBox className="gap-2">
              <FormControl>
                <InputLabel
                  htmlFor="ownerName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.ownerFirstName
                  })}
                >
                  Owner First Name
                </InputLabel>
                <input
                  {...register('ownerFirstName')}
                  id="ownerName"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.ownerFirstName
                  })}
                  placeholder="Enter owner's first name"
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="ownerName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.ownerLastName
                  })}
                >
                  Owner Last Name
                </InputLabel>
                <input
                  {...register('ownerLastName')}
                  id="ownerName"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.ownerLastName
                  })}
                  placeholder="Enter owner's last name"
                />
              </FormControl>
            </FlexBox>

            {additionType === 'parkingLot' && (
              <FormControl className="col-12">
                <InputLabel
                  htmlFor="parkingLotName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.parkingLotName
                  })}
                >
                  Parking Lot Name
                </InputLabel>
                <input
                  {...register('parkingLotName')}
                  id="parkingLotName"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.parkingLotName
                  })}
                  placeholder="Enter parking lot name"
                />
              </FormControl>
            )}

            {additionType === 'singleSpace' && (
              <FormControl className="col-12">
                <InputLabel
                  htmlFor="parkingSpaceName"
                  className={classNames('form-InputLabel fs-base', {
                    'text-red-500': !!errors.parkingSpaceName
                  })}
                >
                  Parking Space Name
                </InputLabel>
                <input
                  {...register('parkingSpaceName')}
                  id="parkingSpaceName"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.parkingSpaceName
                  })}
                  placeholder="Enter parking space name"
                />
              </FormControl>
            )}

            <FormControl className="col-12">
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
                id="address"
                type="text"
                className={classNames('form-control form-control-lg', {
                  'border-red-500 border-2': !!errors.address
                })}
                placeholder="Enter address"
              />
            </FormControl>

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
                  id="city"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.city
                  })}
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
                  id="state"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.state
                  })}
                  placeholder="Entery state"
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
                  id="zip"
                  type="text"
                  className={classNames('form-control form-control-lg', {
                    'border-red-500 border-2': !!errors.zip
                  })}
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
                Submit Your Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
