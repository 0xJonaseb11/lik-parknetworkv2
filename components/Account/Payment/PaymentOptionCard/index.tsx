import { PaymentOptionCard as PaymentOptionCardProps } from '../../../../hooks/account/usePaymentOptions';

export default function PaymentOptionCard({
  isPrimary,
  cardLast4Digits,
  isCryptoPaymentOption,
  walletLast4Chars,
  walletName,
  expiryDate,
  cardLogoUrl,
  cardType
}: PaymentOptionCardProps) {
  return (
    <div className="card d-sm-flex flex-sm-row align-items-sm-center justify-content-between border-0 shadow-sm p-3 p-md-4 mb-4">
      <div className="d-flex align-items-center pe-sm-3">
        <img src={cardLogoUrl} width="84" alt={cardType} />
        <div className="ps-3 ps-sm-4">
          <h6 className="mb-2">
            {!isCryptoPaymentOption
              ? `**** **** **** ${cardLast4Digits}`
              : walletName}
            {isPrimary && (
              <span className="badge bg-success ms-1">Primary</span>
            )}
          </h6>
          <div className="fs-sm">
            {!isCryptoPaymentOption
              ? `Expiration ${expiryDate?.month}/${expiryDate?.year}`
              : `•••••••••• ${walletLast4Chars}`}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end pt-3 pt-sm-0">
        <button
          type="button"
          className="btn btn-outline-secondary px-3 px-xl-4 me-3"
        >
          <i className="bx bx-edit fs-xl me-lg-1 me-xl-2"></i>
          <span className="d-none d-lg-inline">Edit</span>
        </button>
        <button type="button" className="btn btn-outline-danger px-3 px-xl-4">
          <i className="bx bx-trash-alt fs-xl me-lg-1 me-xl-2"></i>
          <span className="d-none d-lg-inline">Delete</span>
        </button>
      </div>
    </div>
  );
}
