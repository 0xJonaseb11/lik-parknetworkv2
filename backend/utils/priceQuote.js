const {
  ch_get_exchange_amount,
  ch_get_minmax_amount,
  cn_get_exchange_amount,
  cn_get_minmax_amount,
  ex_get_exchange_amount,
  sp_get_exchange_amount,
  se_get_exchange_amount,
  se_get_minmax_amount,
  ss_get_exchange_amount,
  ss_get_minmax_amount,
} = require('./api.util');
const {
  getExNetworkTo,
  standardize_ch_symbol,
  standardize_cn_symbol,
  standardize_ex_symbol,
  standardize_sp_symbol,
  standardize_se_symbol,
  standardize_ss_symbol,
  getSpNetwork,
} = require('./symbol.util');

// completed cn
async function price_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, TokenB_symbol);
    const { min: TokenA_min_amount, max: TokenA_max_amount } = cnMinMaxInfo;

    console.log('cnMinMaxInfo=>>', cnMinMaxInfo);
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(TokenA_amount, TokenA_symbol, TokenB_symbol);
      console.log('TokenA_amount=>>', TokenA_amount);
      console.log('TokenA_symbol=>>', TokenA_symbol);
      console.log('TokenB_symbol=>>', TokenB_symbol);
      console.log('estimate=>>', estimate);
      TokenB_amount = estimate['estimatedAmount'];
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'cn'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changenow: ${error}`);
    return [0, 0, 0, 'cn'];
  }
}
// completed ss
async function price_ss(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    let TokenB_amount;
    const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ss_symbol(TokenB_sym);
    const TokenA_amount_info = await ss_get_minmax_amount(TokenA_symbol, TokenB_symbol);
    const max_temp = TokenA_amount_info['max'];
    TokenA_min_amount = parseFloat(TokenA_amount_info['min']);
    TokenA_max_amount = !max_temp ? 0 : parseFloat(max_temp);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      TokenB_amount = parseFloat(await ss_get_exchange_amount(TokenA_symbol, TokenB_symbol, TokenA_amount));
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ss'];
  } catch (error) {
    console.error(`An error occurred while getting the price from simpleswap: ${error}`);
    return [0, 0, 0, 'ss'];
  }
}
// completed se
async function price_se(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_se_symbol(TokenB_sym);

    const seExchangeInfo = await se_get_minmax_amount(TokenA_symbol, TokenB_symbol);
    TokenA_min_amount = parseFloat(seExchangeInfo.min);
    TokenA_max_amount = parseFloat(seExchangeInfo.max);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      TokenB_amount = parseFloat(await se_get_exchange_amount(TokenA_symbol, TokenB_symbol, TokenA_amount));
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'se'];
  } catch (error) {
    console.error(`An error occurred while getting the price from stealthex: ${error}`);
    return [0, 0, 0, 'se'];
  }
}
// completed ex
async function price_ex(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    let TokenB_amount;
    const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ex_symbol(TokenB_sym);
    const networkTo = getExNetworkTo(TokenB_sym);
    const res = await ex_get_exchange_amount(TokenA_symbol, TokenB_symbol, TokenA_amount, networkTo);
    TokenB_amount = res['toAmount'];
    TokenA_min_amount = res['min'];
    TokenA_max_amount = res['max'] || 0;

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix: ${error}`);
    return [0, 0, 0, 'ex'];
  }
}
// completed sp
async function price_sp(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    let TokenB_amount;
    const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
    const TokenB_symbol = standardize_sp_symbol(TokenB_sym);
    const fromNetwork = getSpNetwork(TokenA_sym);
    const toNetwork = getSpNetwork(TokenB_sym);
    const res = await sp_get_exchange_amount(TokenA_symbol, TokenB_symbol, TokenA_amount, toNetwork, fromNetwork);
    TokenB_amount = res['toAmount'];
    TokenA_min_amount = res['min'];
    TokenA_max_amount = res['max'] || 0;

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'sp'];
  } catch (error) {
    console.error(`An error occurred while getting the price from swapspace: ${error}`);
    return [0, 0, 0, 'sp'];
  }
}
// completed ch
async function price_ch(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    let TokenB_amount;
    const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

    const chExchangeInfo = await ch_get_minmax_amount(TokenA_symbol, TokenB_symbol);
    TokenA_min_amount = parseFloat(chExchangeInfo['min']);
    TokenA_max_amount = parseFloat(chExchangeInfo['max']) || 0;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      TokenB_amount = parseFloat(await ch_get_exchange_amount(TokenA_symbol, TokenB_symbol, TokenA_amount));
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ch'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changehero: ${error}`);
    return [0, 0, 0, 'ch'];
  }
}

// General function to fetch min and max amounts
async function fetchMinMaxAmounts(sourceSymbol, targetSymbol, apiFunction, amount = 0, networkTo = '', networkFrom = '') {
  try {
    let min, max;
    if (networkTo === '' && networkFrom === '') {
      // cn, ch, se, ss
      ({ min, max } = await apiFunction(sourceSymbol, targetSymbol));
    } else if (networkFrom === '' && networkTo !== '') {
      // ex
      ({ min, max } = await apiFunction(sourceSymbol, targetSymbol, amount, networkTo));
    } else if (networkFrom !== '' && networkTo !== '') {
      // sp
      ({ min, max } = await apiFunction(sourceSymbol, targetSymbol, amount, networkTo, networkFrom));
    }
    return {
      minValue: parseFloat(min) || 0,
      maxValue: parseFloat(max) || 0,
    };
  } catch (error) {
    console.error(`Error fetching min/max for ${sourceSymbol} to ${targetSymbol}: ${error}`);
    return { minAmount: 0, maxAmount: 0 };
  }
}

// General function to calculate the exchange amount
async function calculateExchangeAmount(sourceAmount, sourceSymbol, targetSymbol, getAmountFunc, networkTo = '', networkFrom = '') {
  try {
    if (networkTo === '' && networkFrom === '') {
      // cn, ch, se, ss
      return await getAmountFunc(sourceSymbol, targetSymbol, sourceAmount);
    } else if (networkFrom === '' && networkTo !== '') {
      // ex
      return await getAmountFunc(sourceSymbol, targetSymbol, sourceAmount, networkTo);
    } else if (networkFrom !== '' && networkTo !== '') {
      // sp
      return await getAmountFunc(sourceSymbol, targetSymbol, sourceAmount, networkTo, networkFrom);
    }
  } catch (error) {
    console.error(`Error calculating exchange amount from ${sourceSymbol} to ${targetSymbol}: ${error}`);
    return { estimatedAmount: 0 }; // Return as an object to keep consistency with API structure
  }
}

// Unified price calculation function
async function price(fromService, toService, TokenA_amount, TokenA_sym, TokenB_sym, intermediateSymbol = 'ZEC') {
  const symbolFuncMap = {
    ss: standardize_ss_symbol,
    cn: standardize_cn_symbol,
    se: standardize_se_symbol,
    ex: standardize_ex_symbol,
    ch: standardize_ch_symbol,
    sp: standardize_sp_symbol,
  };
  const apiFuncMap = {
    ss: { minMax: ss_get_minmax_amount, exchange: ss_get_exchange_amount }, // XVG
    cn: { minMax: cn_get_minmax_amount, exchange: cn_get_exchange_amount }, // XVG
    se: { minMax: se_get_minmax_amount, exchange: se_get_exchange_amount }, // XVG
    ex: { minMax: ex_get_exchange_amount, exchange: ex_get_exchange_amount }, // ZEC
    ch: { minMax: ch_get_minmax_amount, exchange: ch_get_exchange_amount }, // ZEC
    sp: { minMax: sp_get_exchange_amount, exchange: sp_get_exchange_amount }, // zec
  };

  try {
    const fromSymbol = symbolFuncMap[fromService](TokenA_sym);
    const toSymbol = symbolFuncMap[toService](TokenB_sym);

    let minValue, maxValue, estimatedAmount, finalAmount;
    if (fromService === 'sp') {
      const fromNetwork = getSpNetwork(TokenA_sym);
      ({ minValue, maxValue } = await fetchMinMaxAmounts(
        fromSymbol,
        'zec', // intermediateSymbol,
        apiFuncMap[fromService].minMax,
        TokenA_amount,
        'zec',
        fromNetwork,
      ));
    } else if (fromService === 'ex') {
      ({ minValue, maxValue } = await fetchMinMaxAmounts(fromSymbol, intermediateSymbol, apiFuncMap[fromService].minMax, TokenA_amount, 'ZEC'));
    } else {
      ({ minValue, maxValue } = await fetchMinMaxAmounts(fromSymbol, intermediateSymbol, apiFuncMap[fromService].minMax));
    }
    const minAmount = minValue;
    const maxAmount = maxValue;

    if (parseFloat(TokenA_amount) < minAmount || (!!maxAmount && parseFloat(TokenA_amount) > maxAmount)) {
      return [-1, minAmount, maxAmount, `${fromService}_${toService}`];
    }

    if (fromService === 'sp') {
      const networkFrom = getSpNetwork(TokenA_sym);
      const spExchangeInfo = await calculateExchangeAmount(
        TokenA_amount,
        fromSymbol,
        'zec', // intermediateSymbol,
        apiFuncMap[fromService].exchange,
        'zec',
        networkFrom,
      );
      estimatedAmount = spExchangeInfo.toAmount;
      if (toService === 'ex') {
        const networkTo = getExNetworkTo(TokenB_sym);
        const exExchangeInfo = await calculateExchangeAmount(
          estimatedAmount,
          intermediateSymbol,
          toSymbol,
          apiFuncMap[toService].exchange,
          networkTo,
        );
        finalAmount = exExchangeInfo.toAmount;
      } else {
        finalAmount = await calculateExchangeAmount(estimatedAmount, intermediateSymbol, toSymbol, apiFuncMap[toService].exchange);
      }
    } else if (fromService === 'ex') {
      const exExchangeInfo = await calculateExchangeAmount(TokenA_amount, fromSymbol, intermediateSymbol, apiFuncMap[fromService].exchange, 'ZEC');
      estimatedAmount = exExchangeInfo.toAmount;
      if (toService === 'sp') {
        const networkTo = getSpNetwork(TokenB_sym);
        const spExchangeInfo = await calculateExchangeAmount(estimatedAmount, 'zec', toSymbol, apiFuncMap[toService].exchange, networkTo, 'zec');
        finalAmount = spExchangeInfo.toAmount;
      } else {
        finalAmount = await calculateExchangeAmount(estimatedAmount, intermediateSymbol, toSymbol, apiFuncMap[toService].exchange);
      }
    } else {
      estimatedAmount = await calculateExchangeAmount(TokenA_amount, fromSymbol, intermediateSymbol, apiFuncMap[fromService].exchange);
      if (toService === 'sp') {
        const networkTo = getSpNetwork(TokenB_sym);
        const spExchangeInfo = await calculateExchangeAmount(estimatedAmount, 'zec', toSymbol, apiFuncMap[toService].exchange, networkTo, 'zec');
        finalAmount = spExchangeInfo.toAmount;
      } else if (toService === 'ex') {
        const networkTo = getExNetworkTo(TokenB_sym);
        const exExchangeInfo = await calculateExchangeAmount(
          estimatedAmount,
          intermediateSymbol,
          toSymbol,
          apiFuncMap[toService].exchange,
          networkTo,
        );
        finalAmount = exExchangeInfo.toAmount;
      } else {
        finalAmount = await calculateExchangeAmount(estimatedAmount, intermediateSymbol, toSymbol, apiFuncMap[toService].exchange);
      }
    }

    return [finalAmount, minAmount, maxAmount, `${fromService}_${toService}`];
  } catch (error) {
    console.error(`An error occurred in the price transition from ${fromService} to ${toService}: ${error}`);
    return [0, 0, 0, `${fromService}_${toService}`];
  }
}

module.exports = {
  price_cn,
  price_ss,
  price_se,
  price_ex,
  price_ch,
  price_sp,
  price,
};
