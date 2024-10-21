import { Fragment } from 'react';
import usePaymentOptions from '../../../hooks/account/usePaymentOptions';
import PaymentOptionCard from '../../../components/Account/Payment/PaymentOptionCard';

export default function Payment() {
  const paymentOptions = usePaymentOptions();
  return (
    <Fragment>
      <h1 className="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">Payment Details</h1>
      <h2 className="h5 text-primary mb-4">Your saved payment methods</h2>
      {paymentOptions.map((paymentOption) => (
        <PaymentOptionCard
          key={paymentOption.cardLast4Digits || paymentOption.walletLast4Chars}
          {...paymentOption}
        />
      ))}
    </Fragment>
  );
}
