const {
  ch_get_exchange_amount,
  ch_get_minmax_amount,
  cn_get_exchange_amount,
  cn_get_minmax_amount,
  ex_get_exchange_amount,
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
  standardize_se_symbol,
  standardize_ss_symbol,
} = require('./symbol.util');

// compled ss_cn
async function price_ss_to_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);
    const TokenA_amount_info = await ss_get_minmax_amount(TokenA_symbol, 'xvg');
    const max_temp = TokenA_amount_info['max'];
    TokenA_min_amount = parseFloat(TokenA_amount_info['min']);
    TokenA_max_amount = !max_temp ? 0 : parseFloat(max_temp);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount);
      const estimate = await cn_get_exchange_amount(estimated_xvg_amount, 'xvg', TokenB_symbol);
      TokenB_amount = estimate['estimatedAmount'];
      console.log('price_ss_to_cn_TokenB_amount//////////////', estimate);
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ss_cn'];
  } catch (error) {
    console.error(`An error occurred while getting the price from simpleswap to changenow: ${error}`);
    return [0, 0, 0, 'ss_cn'];
  }
}
// completed cn_ss
async function price_cn_to_ss(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, 'xvg');
    const { minAmount, maxAmount } = cnMinMaxInfo;
    TokenA_min_amount = minAmount;
    TokenA_max_amount = !maxAmount ? 0 : maxAmount;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(TokenA_amount, TokenA_symbol, 'xvg');
      const estimated_xvg_amount = estimate['estimatedAmount'];
      TokenB_amount = parseFloat(await ss_get_exchange_amount('xvg', TokenB_symbol, estimated_xvg_amount));
    }
    console.log('price_cn_to_ss_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'cn_ss'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changenow to simpleswap: ${error}`);
    return [0, 0, 0, 'cn_ss'];
  }
}
// completed cn_ex
async function price_cn_to_ex(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, 'zec');
    const { minAmount, maxAmount } = cnMinMaxInfo;
    TokenA_min_amount = minAmount;
    TokenA_max_amount = !maxAmount ? 0 : maxAmount;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(TokenA_amount, TokenA_symbol, 'zec');
      const estimated_xvg_amount = estimate['estimatedAmount'];
      const networkTo = getExNetworkTo(TokenB_sym);
      const exExchangeInfo = await ex_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount, networkTo);
      TokenB_amount = exExchangeInfo['toAmount'];
      // TokenA_max_amount = exExchangeInfo["maxAmount"];
    }
    console.log('price_cn_to_ex_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'cn_ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changenow to Exolix: ${error}`);
    return [0, 0, 0, 'cn_ex'];
  }
}
// completed cn_ch
async function price_cn_to_ch(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, 'zec');
    const { minAmount, maxAmount } = cnMinMaxInfo;
    TokenA_min_amount = minAmount;
    TokenA_max_amount = !maxAmount ? 0 : maxAmount;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(TokenA_amount, TokenA_symbol, 'zec');
      const estimated_xvg_amount = estimate['estimatedAmount'];
      TokenB_amount = parseFloat(await ch_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
    }
    console.log('price_cn_to_ch_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'cn_ch'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changenow to changehero: ${error}`);
    return [0, 0, 0, 'cn_ch'];
  }
}
// completed ex_cn
async function price_ex_to_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

    const networkTo = getExNetworkTo('ZEC');
    const exExchangeInfo = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);
    console.log('price_ex_to_cn_exExchangeInfo', exExchangeInfo);
    TokenA_max_amount = exExchangeInfo['maxAmount'];
    TokenA_min_amount = exExchangeInfo['minAmount'];
    const estimated_xvg_amount = exExchangeInfo['toAmount'];

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(estimated_xvg_amount, 'zec', TokenB_symbol);
      TokenB_amount = estimate['estimatedAmount'];
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }
    console.log('price_ex_to_cn_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex_cn'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix to changenow: ${error}`);
    return [0, 0, 0, 'ex_cn'];
  }
}
// completed ch_cn
async function price_ch_to_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

    const chMinMaxInfo = await ch_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(chMinMaxInfo.result[0]['min']);
    TokenA_max_amount = parseFloat(chMinMaxInfo.result[0]['max']) || 0;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = parseFloat(await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount));
      const estimate = await cn_get_exchange_amount(estimated_xvg_amount, 'zec', TokenB_symbol);
      TokenB_amount = estimate['estimatedAmount'];
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }
    console.log('price_ch_to_cn_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ch_cn'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changehero to changenow: ${error}`);
    return [0, 0, 0, 'ch_cn'];
  }
}
// completed se_cn
async function price_se_to_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

    const seExchangeInfo = await se_get_minmax_amount(TokenA_symbol, 'xvg');
    TokenA_min_amount = parseFloat(seExchangeInfo.min_amount);
    TokenA_max_amount = parseFloat(seExchangeInfo.max_amount);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await se_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount);
      const estimate = await cn_get_exchange_amount(estimated_xvg_amount, 'xvg', TokenB_symbol);
      TokenB_amount = estimate['estimatedAmount'];
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'se_cn'];
  } catch (error) {
    console.error(`An error occurred while getting the price from stealthex to changenow: ${error}`);
    return [0, 0, 0, 'se_cn'];
  }
}
// completed cn_se
async function price_cn_to_se(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_se_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, 'xvg');
    const { minAmount, maxAmount } = cnMinMaxInfo;
    TokenA_min_amount = minAmount;
    TokenA_max_amount = !maxAmount ? 0 : maxAmount;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = await cn_get_exchange_amount(TokenA_amount, TokenA_symbol, 'xvg');
      const estimated_xvg_amount = estimate['estimatedAmount'];
      TokenB_amount = parseFloat(await se_get_exchange_amount('xvg', TokenB_symbol, estimated_xvg_amount));
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'cn_se'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changenow to stealthex: ${error}`);
    return [0, 0, 0, 'cn_se'];
  }
}
// completed ss_se
async function price_ss_to_se(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    let TokenB_max_amount;
    const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
    const TokenB_symbol = standardize_se_symbol(TokenB_sym);
    let TokenA_amount_info = await ss_get_minmax_amount(TokenA_symbol, 'xvg');
    const max_temp = TokenA_amount_info['max'];
    TokenA_min_amount = parseFloat(TokenA_amount_info['min']);
    TokenA_max_amount = !max_temp ? 0 : parseFloat(max_temp);
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount);
      TokenB_amount = parseFloat(await se_get_exchange_amount('xvg', TokenB_symbol, estimated_xvg_amount));
    }
    console.log('price_ss_to_se_TokenB_amount//////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ss_se'];
  } catch (error) {
    console.error(`An error occurred while getting the price from simpleswap to stealthex: ${error}`);
    return [0, 0, 0, 'ss_se'];
  }
}
// completed se_ss
async function price_se_to_ss(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;
    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ss_symbol(TokenB_sym);
    const seExchangeInfo = await se_get_minmax_amount(TokenA_symbol, 'xvg');
    TokenA_min_amount = parseFloat(seExchangeInfo.min_amount);
    TokenA_max_amount = parseFloat(seExchangeInfo.max_amount);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await se_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount);
      TokenB_amount = parseFloat(await ss_get_exchange_amount('xvg', TokenB_symbol, estimated_xvg_amount));
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'se_ss'];
  } catch (error) {
    console.error(`An error occurred while getting the price from stealthex to simpleswap: ${error}`);
    return [0, 0, 0, 'se_ss'];
  }
}
// completed se_ex
async function price_se_to_ex(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

    const seExchangeInfo = await se_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(seExchangeInfo.min_amount);
    TokenA_max_amount = parseFloat(seExchangeInfo.max_amount);
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await se_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

      const networkTo = getExNetworkTo(TokenB_sym);
      const exExchangeInfo = await ex_get_exchange_amount('ZEC', TokenB_symbol, estimated_xvg_amount, networkTo);
      TokenB_amount = exExchangeInfo['toAmount'];
    }

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'se_ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from stealthex to exolix: ${error}`);
    return [0, 0, 0, 'se_ex'];
  }
}
// completed ch_ex
async function price_ch_to_ex(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

    const chMinMaxInfo = await ch_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(chMinMaxInfo.result[0]['min']);
    TokenA_max_amount = parseFloat(chMinMaxInfo.result[0]['max']) || 0;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = parseFloat(await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount));

      const networkTo = getExNetworkTo(TokenB_sym);
      const exExchangeInfo = await ex_get_exchange_amount('ZEC', TokenB_symbol, estimated_xvg_amount, networkTo);
      TokenB_amount = exExchangeInfo['toAmount'];
    }
    console.log('price_ch_to_ex_TokenB_amount///////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ch_ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changehero to exolix: ${error}`);
    return [0, 0, 0, 'ch_ex'];
  }
}
// completed se_ch
async function price_se_to_ch(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_se_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

    const seExchangeInfo = await se_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(seExchangeInfo.min_amount);
    TokenA_max_amount = parseFloat(seExchangeInfo.max_amount);
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await se_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

      TokenB_amount = parseFloat(await ch_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
    }
    console.log('price_se_to_ch_TokenB_amount////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'se_ch'];
  } catch (error) {
    console.error(`An error occurred while getting the price from stealthex to changehero: ${error}`);
    return [0, 0, 0, 'se_ch'];
  }
}
// completed ex_se
async function price_ex_to_se(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
    const TokenB_symbol = standardize_se_symbol(TokenB_sym);

    const networkTo = getExNetworkTo('ZEC');
    const exExchangeInfo = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);
    TokenA_max_amount = exExchangeInfo['maxAmount'];
    TokenA_min_amount = exExchangeInfo['minAmount'];
    const estimated_xvg_amount = exExchangeInfo['toAmount'];
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimate = parseFloat(await se_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
      TokenB_amount = estimate;
    }

    console.log('price_ex_to_se_TokenB_amount////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex_se'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix to stealthex: ${error}`);
    return [0, 0, 0, 'ex_se'];
  }
}
// completed ch_se
async function price_ch_to_se(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
    const TokenB_symbol = standardize_se_symbol(TokenB_sym);

    const chMinMaxInfo = await ch_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(chMinMaxInfo.result[0]['min']);
    TokenA_max_amount = parseFloat(chMinMaxInfo.result[0]['max']) || 0;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = parseFloat(await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount));
      TokenB_amount = parseFloat(await se_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }

    console.log('price_ch_to_se_TokenB_amount////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ch_se'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changehero to stealthex: ${error}`);
    return [0, 0, 0, 'ch_se'];
  }
}
// completed ex_ch
async function price_ex_to_ch(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

    const networkTo = getExNetworkTo('ZEC');
    const exExchangeInfo = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);
    TokenA_max_amount = exExchangeInfo['maxAmount'];
    TokenA_min_amount = exExchangeInfo['minAmount'];
    const estimated_xvg_amount = exExchangeInfo['toAmount'];
    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      TokenB_amount = parseFloat(await ch_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
    }

    console.log('price_ex_to_ch_TokenB_amount////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex_ch'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix to changehero: ${error}`);
    return [0, 0, 0, 'ex_ch'];
  }
}
// completed ss_ex
async function price_ss_to_ex(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

    const TokenA_amount_info = await ss_get_minmax_amount(TokenA_symbol, 'zec');
    const max_temp = TokenA_amount_info['max'];
    TokenA_min_amount = parseFloat(TokenA_amount_info['min']);
    TokenA_max_amount = !max_temp ? 0 : parseFloat(max_temp);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

      const networkTo = getExNetworkTo(TokenB_sym);
      const exExchangeInfo = await ex_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount, networkTo);
      TokenB_amount = exExchangeInfo['toAmount'];
    }
    console.log('price_ss_to_ex_TokenB_amount//////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ss_ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from simpleswap to exolix: ${error}`);
    return [0, 0, 0, 'ss_ex'];
  }
}
// completed ss_ch
async function price_ss_to_ch(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

    const TokenA_amount_info = await ss_get_minmax_amount(TokenA_symbol, 'zec');
    const max_temp = TokenA_amount_info['max'];
    TokenA_min_amount = parseFloat(TokenA_amount_info['min']);
    TokenA_max_amount = !max_temp ? 0 : parseFloat(max_temp);

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

      TokenB_amount = parseFloat(await ch_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
    }
    console.log('price_ss_to_ch_TokenB_amount//////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ss_ch'];
  } catch (error) {
    console.error(`An error occurred while getting the price from simpleswap to changehero: ${error}`);
    return [0, 0, 0, 'ss_ch'];
  }
}
// completed ex_ss
async function price_ex_to_ss(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

    const networkTo = getExNetworkTo('ZEC');
    const exExchangeInfo = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);
    TokenA_max_amount = exExchangeInfo['maxAmount'];
    TokenA_min_amount = exExchangeInfo['minAmount'];
    const estimated_xvg_amount = exExchangeInfo['toAmount'];

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      TokenB_amount = parseFloat(await ss_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }
    console.log('price_ex_to_ss_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex_ss'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix to simpleswap: ${error}`);
    return [0, 0, 0, 'ex_ss'];
  }
}
// completed ch_ss
async function price_ch_to_ss(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    let TokenA_min_amount;
    let TokenA_max_amount = 0;

    const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
    const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

    const chMinMaxInfo = await ch_get_minmax_amount(TokenA_symbol, 'zec');
    TokenA_min_amount = parseFloat(chMinMaxInfo.result[0]['min']);
    TokenA_max_amount = parseFloat(chMinMaxInfo.result[0]['max']) || 0;

    if (parseFloat(TokenA_amount) < TokenA_min_amount || (!!TokenA_max_amount && parseFloat(TokenA_amount) > TokenA_max_amount)) TokenB_amount = -1;
    else {
      const estimated_xvg_amount = parseFloat(await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount));
      TokenB_amount = parseFloat(await ss_get_exchange_amount('zec', TokenB_symbol, estimated_xvg_amount));
      if (isNaN(TokenB_amount)) TokenB_amount = -1;
    }
    console.log('price_ch_to_ss_TokenB_amount/////////////', TokenB_amount);

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ch_ss'];
  } catch (error) {
    console.error(`An error occurred while getting the price from changehero to simpleswap: ${error}`);
    return [0, 0, 0, 'ch_ss'];
  }
}
// completed cn
async function price_cn(TokenA_amount, TokenA_sym, TokenB_sym) {
  try {
    let TokenB_amount;
    const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
    const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

    const cnMinMaxInfo = await cn_get_minmax_amount(TokenA_symbol, TokenB_symbol);
    const { minAmount: TokenA_min_amount, maxAmount: TokenA_max_amount } = cnMinMaxInfo;

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
    TokenA_min_amount = parseFloat(seExchangeInfo.min_amount);
    TokenA_max_amount = parseFloat(seExchangeInfo.max_amount);

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
    TokenA_min_amount = res['minAmount'];
    TokenA_max_amount = res['maxAmount'] || 0;

    return [TokenB_amount, TokenA_min_amount, TokenA_max_amount, 'ex'];
  } catch (error) {
    console.error(`An error occurred while getting the price from exolix: ${error}`);
    return [0, 0, 0, 'ex'];
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
    TokenA_min_amount = parseFloat(chExchangeInfo.result[0]['min']);
    TokenA_max_amount = parseFloat(chExchangeInfo.result[0]['max']) || 0;

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

module.exports = {
  price_ss_to_cn,
  price_cn_to_ss,
  price_se_to_cn,
  price_cn_to_se,
  price_ss_to_se,
  price_se_to_ss,
  price_cn_to_ex,
  price_cn_to_ch,
  price_ex_to_cn,
  price_ch_to_cn,
  price_se_to_ex,
  price_se_to_ch,
  price_ex_to_se,
  price_ch_to_se,
  price_ex_to_ch,
  price_ch_to_ex,
  price_ss_to_ex,
  price_ss_to_ch,
  price_ex_to_ss,
  price_ch_to_ss,
  price_cn,
  price_ss,
  price_se,
  price_ex,
  price_ch,
};
