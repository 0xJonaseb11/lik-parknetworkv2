const axios = require('axios');

// region ChangeNow
/* 
  ChangeNow APIs
*/
async function cn_get_exchange_amount(from_ticker, to_ticker, amount) {
  const apiURL = `${process.env.CN_API_URL}exchange-amount/${amount}/${from_ticker}_${to_ticker}?api_key=${process.env.CN_API_KEY}`;
  try {
    const response = await axios.get(apiURL);
    return response.data['estimatedAmount'];
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in changenow: ${error}`);
  }
}

async function cn_get_minmax_amount(from_ticker, to_ticker) {
  const apiURL = `${process.env.CN_API_URL}exchange-range/${from_ticker}_${to_ticker}?api_key=${process.env.CN_API_KEY}`;
  try {
    const response = await axios.get(apiURL);
    const { minAmount: min, maxAmount: max } = response.data;
    return { min, max };
  } catch (error) {
    console.error(`An error occurred while getting the maximum exchange amount in changenow: ${error}`);
  }
}

async function cn_create_new_exchange(from_ticker, to_ticker, address, amount, extraId = '') {
  try {
    const url = `${process.env.CN_API_URL}transactions/${process.env.CN_API_KEY}`;
    const transaction_data = {
      from: from_ticker,
      to: to_ticker,
      address,
      amount,
      extraId,
      refundAddress: '',
      refundExtraId: '',
      userId: '',
      contactEmail: '',
    };
    const headers = { 'Content-Type': 'application/json' };
    const response = await axios.post(url, transaction_data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error while creating new exchange in changenow: ${error}`);
    return null;
  }
}

async function cn_get_exchange_info(tx_id) {
  try {
    const url = `${process.env.CN_API_URL}transactions/${tx_id}/${process.env.CN_API_KEY}`;
    const response = await axios.get(url);
    console.log('cn_get_exchange_info_response', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error while getting transaction status from changenow: ${error}`);
    return null;
  }
}

// region SimpleSwap
/* 
  Simpleswap APIs
*/
async function ss_get_exchange_amount(currency_from, currency_to, amount) {
  const apiURL = `${process.env.SS_API_URL}get_estimated?api_key=${process.env.SS_API_KEY}&fixed=false&currency_from=${currency_from}&currency_to=${currency_to}&amount=${amount}`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in simpleswap: ${error}`);
  }
}

async function ss_create_new_exchange(currency_from, currency_to, address_to, amount, extraIdTo = '') {
  try {
    const url = `${process.env.SS_API_URL}create_exchange?api_key=${process.env.SS_API_KEY}`;
    const payload = JSON.stringify({
      fixed: false,
      currency_from,
      currency_to,
      address_to,
      amount,
      extraIdTo,
    });
    const headers = { 'Content-Type': 'application/json' };
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error while creating new exchange in simpleswap: ${error}`);
    return null;
  }
}

async function ss_get_minmax_amount(currency_from, currency_to) {
  const apiURL = `${process.env.SS_API_URL}get_ranges?api_key=${process.env.SS_API_KEY}&fixed=false&currency_from=${currency_from}&currency_to=${currency_to}`;
  // console.log('ss_get_minmax_amount==>>', apiURL);
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.error(`An error occurred while getting the min, max exchange amount in simpleswap: ${error}`);
  }
}

async function ss_get_exchange_info(orderId) {
  try {
    const url = `${process.env.SS_API_URL}get_exchange?api_key=${process.env.SS_API_KEY}&id=${orderId}`;
    console.log('ss_get_exchange_info_url', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error while getting exchange info in simpleswap: ${error}`);
    return null;
  }
}

// region Stealthex
/* 
  Stealthex APIs
*/
async function se_get_exchange_amount(currency_from, currency_to, amount) {
  const apiURL = `${process.env.SE_API_URL}estimate/${currency_from}/${currency_to}?amount=${amount}&api_key=${process.env.SE_API_KEY}&fixed=false`;
  try {
    const response = await axios.get(apiURL);
    return response.data.estimated_amount;
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in stealthex: ${error}`);
  }
}

async function se_get_minmax_amount(currency_from, currency_to) {
  const apiURL = `${process.env.SE_API_URL}range/${currency_from}/${currency_to}?fixed=false&api_key=${process.env.SE_API_KEY}`;
  try {
    const response = await axios.get(apiURL, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });
    const { min_amount: min, max_amount: max } = response.data;
    return { min, max };
  } catch (error) {
    console.error(`An error occurred while getting the max exchange amount in stealthex: ${error}`);
  }
}

async function se_get_exchange_info(orderId) {
  try {
    const url = `${process.env.SE_API_URL}exchange/${orderId}?api_key=${process.env.SE_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error while getting exchange info in stealthex: ${error}`);
    return null;
  }
}

async function se_create_new_exchange(currency_from, currency_to, address_to, amount, extraIdTo = '') {
  try {
    const url = `${process.env.SE_API_URL}exchange?api_key=${process.env.SE_API_KEY}`;
    const payload = JSON.stringify({
      currency_from,
      currency_to,
      address_to,
      amount_from: amount,
      extra_id_to: extraIdTo,
    });
    const headers = { 'Content-Type': 'application/json' };
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error while creating new exchange in stealthex: ${error}`);
    return null;
  }
}

// region ChangeHero
/* 
  ChangeHero APIs
*/
async function chAPICall(method, params) {
  try {
    const data = JSON.stringify({ jsonrpc: '2.0', id: 'test', method, params });
    const config = {
      headers: {
        'api-key': process.env.CH_API_KEY,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(process.env.CH_API_URL, data, config);
    return response.data;
  } catch (error) {
    console.error(`An error occurred while getting the min, max amount in changehero: ${error}`);
    throw error;
  }
}

async function ch_get_minmax_amount(currency_from, currency_to) {
  try {
    const params = {
      from: currency_from,
      to: currency_to,
    };
    const chMinMaxInfo = await chAPICall('getFixRate', params);
    const { min, max } = chMinMaxInfo.result[0];
    return { min, max };
  } catch (error) {
    console.error(`An error occurred while getting the max exchange amount in stealthex: ${error}`);
  }
}

async function ch_get_exchange_amount(currency_from, currency_to, amount) {
  try {
    const params = {
      from: currency_from,
      to: currency_to,
      amount,
    };
    const chExchangeAmountInfo = await chAPICall('getExchangeAmount', params);
    return chExchangeAmountInfo.result;
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in stealthex: ${error}`);
  }
}

async function ch_get_exchange_info(id) {
  try {
    const params = { id };
    const chExchangeInfo = await chAPICall('getStatus', params);
    return chExchangeInfo.result;
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in stealthex: ${error}`);
  }
}

async function ch_create_new_exchange(from, to, address, extraId = '', amount, refundAddress = '', refundExtraId = '') {
  console.log('address==>>>', address);
  try {
    const params = {
      from,
      to,
      address,
      extraId,
      amount,
      refundAddress,
      refundExtraId,
      flow: 'payments_gate',
    };
    const ch_order = await chAPICall('createTransaction', params);
    return ch_order;
  } catch (error) {
    console.error(`Error while creating new exchange in Exolix: ${error}`);
    return null;
  }
}

// region Exolix
/* 
  Exolix APIs
*/
async function ex_get_exchange_amount(currency_from, currency_to, amount, network_to) {
  const apiURL = `${process.env.EX_API_URL}rate?coinFrom=${currency_from}&coinTo=${currency_to}&networkTo=${network_to}&amount=${amount}&rateType=float`;
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: process.env.EX_API_KEY,
      },
    });
    const { minAmount: min, maxAmount: max, toAmount } = response.data;
    /* 
    ex_response=====================> {
      fromAmount: 1.1,
      toAmount: 21.170877,
      rate: 19.24625182,
      message: null,
      minAmount: 0.00432099,
      withdrawMin: 0.01,
      maxAmount: 108.02469969
    }
    */
    return { min, max, toAmount };
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in ex_get_exchange_amount: ${error}`);
  }
}

async function ex_create_new_exchange(
  coinFrom,
  coinTo,
  networkFrom,
  networkTo,
  amount,
  withdrawalAddress,
  withdrawalExtraId = '',
  refundAddress = '',
  refundExtraId = '',
  rateType = 'float',
) {
  try {
    const url = `${process.env.EX_API_URL}transactions`;

    const payload = JSON.stringify({
      coinFrom,
      coinTo,
      networkFrom,
      networkTo,
      amount,
      withdrawalAddress,
      withdrawalExtraId,
      refundAddress,
      refundExtraId,
      rateType,
    });
    const headers = {
      Authorization: process.env.EX_API_KEY,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error while creating new exchange in Exolix: ${error}`);
    return null;
  }
}

async function ex_get_exchange_info(orderId) {
  try {
    const url = `${process.env.EX_API_URL}transactions/${orderId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error while getting exchange info in simpleswap: ${error}`);
    return null;
  }
}

// region swapspace
/* 
  SwapSpace API
*/
async function sp_get_exchange_amount(currency_from, currency_to, amount, to_network, from_network) {
  const apiURL = `${process.env.SP_API_URL}amounts?fromCurrency=${currency_from}&fromNetwork=${from_network}&toCurrency=${currency_to}&toNetwork=${to_network}&amount=${amount}&partner=swapuz&fixed=false`;
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: process.env.SP_API_KEY,
      },
    });
    console.log('sp_get_exchange_amount_res=>', response.data);
    const { min, max, toAmount } = response.data[0];
    return { min, max, toAmount };
  } catch (error) {
    console.error(`An error occurred while getting the exchange amount in ex_get_exchange_amount: ${error}`);
  }
}

async function sp_create_new_exchange(fromCurrency, toCurrency, fromNetwork, toNetwork, address, amount, extraId = '') {
  try {
    const url = `${process.env.SP_API_URL}exchange`;
    const payload = JSON.stringify({
      partner: 'swapuz',
      fromCurrency,
      toCurrency,
      fromNetwork,
      toNetwork,
      address,
      amount,
      fixed: false,
      extraId,
      rateId: '',
      userIp: '8.8.8.8',
      refund: '',
    });
    const headers = {
      Authorization: process.env.SP_API_KEY,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error while creating new exchange in SpaceSwap: ${error}`);
    return null;
  }
}

async function sp_get_exchange_info(id) {
  try {
    const apiURL = `${process.env.SP_API_URL}exchange/${id}`;
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: process.env.SP_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error while getting transaction status from swapspace: ${error}`);
    return null;
  }
}

/* 
  Standard function to get min_max value 
*/
function get_min_max_range(estimated_xvg_amount, TokenA_amount, TokenA_xmr_min_amount, xmr_TokenB_min_amount, xmr_TokenB_max_amount) {
  let TokenA_min_amount;
  let TokenA_max_amount;
  const exchange_rate = parseFloat(estimated_xvg_amount) / TokenA_amount;
  const TokenA_min_amount_est = xmr_TokenB_min_amount / exchange_rate;
  const TokenA_max_amount_est = xmr_TokenB_max_amount === -1 ? -1 : xmr_TokenB_max_amount / exchange_rate;
  TokenA_min_amount = TokenA_min_amount_est > TokenA_xmr_min_amount ? TokenA_min_amount_est : TokenA_xmr_min_amount;
  TokenA_max_amount = TokenA_max_amount_est < xmr_TokenB_max_amount ? TokenA_max_amount_est : xmr_TokenB_max_amount;

  return [TokenA_min_amount, TokenA_max_amount];
}

module.exports = {
  ex_get_exchange_amount,
  sp_get_exchange_amount,
  cn_get_exchange_amount,
  ss_get_exchange_amount,
  ch_get_exchange_amount,
  se_get_exchange_amount,

  ss_create_new_exchange,
  ex_create_new_exchange,
  sp_create_new_exchange,
  se_create_new_exchange,
  ch_create_new_exchange,
  cn_create_new_exchange,

  ss_get_minmax_amount,
  cn_get_minmax_amount,
  ch_get_minmax_amount,
  se_get_minmax_amount,

  se_get_exchange_info,
  cn_get_exchange_info,
  ss_get_exchange_info,
  ex_get_exchange_info,
  ch_get_exchange_info,
  sp_get_exchange_info,

  chAPICall,
};
