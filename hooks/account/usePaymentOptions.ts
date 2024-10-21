export type ExpiryDate = {
  month: string;
  year: string;
};

export type PaymentOptionCard = {
  isPrimary?: boolean;
  cardLast4Digits?: string;
  isCryptoPaymentOption?: boolean;
  walletName?: string;
  walletLast4Chars?: string;
  expiryDate?: ExpiryDate;
  cardLogoUrl?: string;
  cardType?: string;
};

export default function usePaymentOptions() {
  const paymentOptions: PaymentOptionCard[] = [
    {
      cardLogoUrl:
        'https://silicon.createx.studio/assets/img/account/mastercard.svg',
      cardType: 'Mastercard',
      cardLast4Digits: '4298',
      isPrimary: true,
      expiryDate: {
        month: '09',
        year: '26'
      }
    },
    {
      cardLogoUrl: 'https://silicon.createx.studio/assets/img/account/visa.svg',
      cardType: 'Visa',
      cardLast4Digits: '9276',
      expiryDate: {
        month: '11',
        year: '25'
      }
    },
    {
      cardLogoUrl: 'https://silicon.createx.studio/assets/img/account/amex.svg',
      cardType: 'Amex',
      cardLast4Digits: '3854',
      expiryDate: {
        month: '03',
        year: '26'
      }
    },
    {
      cardLogoUrl:
        'https://silicon.createx.studio/assets/img/account/bitcoin.svg',
      isCryptoPaymentOption: true,
      walletName: 'Bitcoin (BTC)',
      walletLast4Chars: 'UNky'
    }
  ];

  return paymentOptions;
}
