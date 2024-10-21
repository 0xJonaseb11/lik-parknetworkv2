const axios = require('axios');

const {
  standardize_cn_symbol,
  standardize_ss_symbol,
  standardize_se_symbol,
  standardize_ex_symbol,
  getExNetworkTo,
  standardize_ch_symbol,
  standardize_sp_symbol,
  getSpNetwork,
} = require('./symbol.util');
const { xrp_address_encode, xrp_address_decode, cn_get_exchange_info, ss_get_exchange_info } = require('./function.util');
const {
  se_get_exchange_info,
  ss_create_new_exchange,
  ex_create_new_exchange,
  ch_create_new_exchange,
  sp_create_new_exchange,
  se_create_new_exchange,
  ex_get_exchange_amount,
  cn_get_exchange_amount,
  se_get_exchange_amount,
  ss_get_exchange_amount,
  cn_create_new_exchange,
  ch_get_exchange_amount,
  sp_get_exchange_amount,
} = require('./api.util');

// completed cn_ss
async function exchange_cn_to_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow to SimpleSwap

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  const estimated_xvg_amount = await cn_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString());
  // const TokenB_amount = await ss_get_exchange_amount(
  //   "xvg",
  //   TokenB_symbol,
  //   estimated_xvg_amount.toString()
  // );

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange('xvg', TokenB_symbol, r_address, parseFloat(estimated_xvg_amount), destination_tag);
  } else {
    ss_order = await ss_create_new_exchange('xvg', TokenB_symbol, TokenB_address, parseFloat(estimated_xvg_amount), '');
  }
  const tmp_xmr_address = ss_order?.address_from;

  const cn_order = await cn_create_new_exchange(TokenA_symbol, 'xvg', tmp_xmr_address, TokenA_amount, '');

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
  } else {
    paying_address = cn_order?.payinAddress;
  }

  tokenA_xmr_orderID = cn_order?.id;
  xmr_tokenB_orderID = ss_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'cn_ss',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!cn_order || !ss_order) return null;
  return content;
}
// completed ss_cn
async function exchange_ss_to_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SimpleSwap to ChangeNow

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString());

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange('xvg', TokenB_symbol, r_address, estimated_xvg_amount, destination_tag);
  } else {
    cn_order = await cn_create_new_exchange('xvg', TokenB_symbol, TokenB_address, estimated_xvg_amount, '');
  }
  const tmp_xmr_address = cn_order?.payinAddress;

  const ss_order = await ss_create_new_exchange(TokenA_symbol, 'xvg', tmp_xmr_address, TokenA_amount.toString(), '');

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
  } else {
    paying_address = ss_order?.address_from;
  }

  const tx_status = await cn_get_exchange_info(cn_order?.id);

  tokenA_xmr_orderID = ss_order?.id;
  xmr_tokenB_orderID = cn_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_cn',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ss_order || !cn_order) return null;
  return content;
}
// completed ex_cn
async function exchange_ex_to_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix to ChangeNow

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  const networkTo = getExNetworkTo('ZEC');
  const { toAmount: estimated_zec_amount } = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, r_address, estimated_zec_amount, destination_tag);
  } else {
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, TokenB_address, estimated_zec_amount, '');
  }
  const tmp_zec_address = cn_order?.payinAddress;

  const networkFrom = getExNetworkTo(TokenA_sym);
  const ex_order = await ex_create_new_exchange(TokenA_symbol, 'ZEC', networkFrom, 'ZEC', TokenA_amount, tmp_zec_address);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
  } else {
    paying_address = ex_order?.depositAddress;
  }

  tokenA_xmr_orderID = ex_order?.id;
  xmr_tokenB_orderID = cn_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex_cn',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ex_order || !cn_order) return null;
  return content;
}
// completed cn_ex
async function exchange_cn_to_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow to Exolix

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  const estimated_zec_amount = await cn_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkTo = getExNetworkTo(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), r_address, destination_tag);
  } else {
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), TokenB_address);
  }
  const tmp_zec_address = ex_order?.depositAddress;

  const cn_order = await cn_create_new_exchange(TokenA_symbol.toLowerCase(), 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
  } else {
    paying_address = cn_order?.payinAddress;
  }

  tokenA_xmr_orderID = cn_order?.id;
  xmr_tokenB_orderID = ex_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'cn_ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  console.log('exchange_cn_to_ex__content=========>>', content);
  if (!cn_order || !ex_order) return null;
  return content;
}
// completed cn_ch
async function exchange_cn_to_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow to changeHero

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  const estimated_zec_amount = await cn_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, r_address, destination_tag, estimated_zec_amount);
  } else {
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, TokenB_address, '', estimated_zec_amount);
  }
  const tmp_zec_address = ch_order?.result.payinAddress;

  const cn_order = await cn_create_new_exchange(TokenA_symbol.toLowerCase(), 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
  } else {
    paying_address = cn_order?.payinAddress;
  }

  tokenA_xmr_orderID = cn_order?.id;
  xmr_tokenB_orderID = ch_order?.result.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'cn_ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!cn_order || !ch_order) return null;
  return content;
}
// completed ch_cn
async function exchange_ch_to_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Changehero to ChangeNow

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, r_address, estimated_zec_amount, destination_tag);
  } else {
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, TokenB_address, estimated_zec_amount);
  }
  const tmp_zec_address = cn_order?.payinAddress;

  const ch_order = await ch_create_new_exchange('zec', TokenB_symbol, tmp_zec_address, '', estimated_zec_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
  } else {
    paying_address = ch_order?.result.payinAddress;
  }

  tokenA_xmr_orderID = ch_order?.result.id;
  xmr_tokenB_orderID = cn_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch_cn',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order || !cn_order) return null;
  return content;
}
// completed se_ch
async function exchange_se_to_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Stealthex to changeHero

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  const estimated_zec_amount = await se_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, r_address, destination_tag, estimated_zec_amount);
  } else {
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, TokenB_address, '', estimated_zec_amount);
  }
  const tmp_zec_address = ch_order?.result.payinAddress;

  const se_order = await se_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount);
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
  } else {
    paying_address = se_order?.address_from;
  }

  tokenA_xmr_orderID = se_order?.id;
  xmr_tokenB_orderID = ch_order?.result.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'se_ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  console.log('exchange_se_to_ch__content=========>>', content);
  if (!se_order || !ch_order) return null;
  return content;
}
// completed ch_se
async function exchange_ch_to_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // changehero to Stealthex

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange('zec', TokenB_symbol, r_address, parseFloat(estimated_zec_amount), destination_tag);
  } else {
    se_order = await se_create_new_exchange('zec', TokenB_symbol, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = se_order?.address_from;

  const ch_order = await ss_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString(), '');
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
  } else {
    paying_address = ch_order?.result.payinAddress;
  }

  tokenA_xmr_orderID = ch_order?.result.id;
  xmr_tokenB_orderID = se_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order || !se_order) return null;
  return content;
}
// completed ss_ch
async function exchange_ss_to_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Simpleswap to changeHero

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  const estimated_zec_amount = await ss_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, r_address, destination_tag, estimated_zec_amount);
  } else {
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, TokenB_address, '', estimated_zec_amount);
  }
  const tmp_zec_address = ch_order?.result.payinAddress;

  const ss_order = await ss_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
  } else {
    paying_address = ss_order?.address_from;
  }

  tokenA_xmr_orderID = ss_order?.id;
  xmr_tokenB_orderID = ch_order?.result.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  console.log('exchange_ss_to_ch__content=========>>', content);
  if (!ss_order || !ch_order) return null;
  return content;
}
// completed ch_ss
async function exchange_ch_to_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // changehero to Stealthex

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, r_address, parseFloat(estimated_zec_amount), destination_tag);
  } else {
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = ss_order?.address_from;

  const ch_order = await ch_create_new_exchange('zec', TokenB_symbol, tmp_zec_address, '', estimated_zec_amount);
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
  } else {
    paying_address = ch_order?.result.payinAddress;
  }

  tokenA_xmr_orderID = ch_order?.result.id;
  xmr_tokenB_orderID = ss_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch_ss',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order || !ss_order) return null;
  return content;
}
// completed ex_ch
async function exchange_ex_to_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix to changeHero

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  const networkTo = getExNetworkTo('ZEC');
  const { toAmount: estimated_zec_amount } = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, r_address, destination_tag, estimated_zec_amount);
  } else {
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, TokenB_address, '', estimated_zec_amount);
  }
  const tmp_zec_address = ch_order?.result.payinAddress;

  const networkFrom = getExNetworkTo(TokenA_sym);
  const ex_order = await ex_create_new_exchange(TokenA_symbol, 'ZEC', networkFrom, 'ZEC', TokenA_amount, tmp_zec_address);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
  } else {
    paying_address = ex_order?.depositAddress;
  }

  tokenA_xmr_orderID = ex_order?.id;
  xmr_tokenB_orderID = ch_order?.result.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex_ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  console.log('exchange_ex_to_ch__content=========>>', content);
  if (!ex_order || !ch_order) return null;
  return content;
}
// completed ch_ex
async function exchange_ch_to_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // changehero to Exolix

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkTo = getExNetworkTo(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), r_address, destination_tag);
  } else {
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), TokenB_address);
  }
  const tmp_zec_address = ex_order?.depositAddress;

  const ch_order = await ch_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, '', TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
  } else {
    paying_address = ch_order?.result.payinAddress;
  }

  tokenA_xmr_orderID = ch_order?.result.id;
  xmr_tokenB_orderID = ex_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toUpperCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch_ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order || !ex_order) return null;
  return content;
}
// completed ex_ss
async function exchange_ex_to_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix to Simpleswap

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  const networkTo = getExNetworkTo('ZEC');
  const { toAmount: estimated_zec_amount } = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, r_address, parseFloat(estimated_zec_amount), destination_tag);
  } else {
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, TokenB_address, parseFloat(estimated_zec_amount));
  }

  const tmp_zec_address = ss_order?.address_from;

  const networkFrom = getExNetworkTo(TokenA_sym);
  const ex_order = await ex_create_new_exchange(TokenA_symbol, 'ZEC', networkFrom, 'ZEC', TokenA_amount, tmp_zec_address);
  console.log('exchange_ex_ss__ex_order=>>', ex_order);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
  } else {
    paying_address = ex_order?.depositAddress;
  }

  // const tx_status = await cn_get_exchange_info(ss_order?.id);

  tokenA_xmr_orderID = ex_order?.id;
  xmr_tokenB_orderID = ss_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex_ss',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  console.log('exchange_ex_to_ss__content============', content);
  if (!ex_order || !ss_order) return null;
  return content;
}
// completed ss_ex
async function exchange_ss_to_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SimpleSwap to Exolix

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  const estimated_zec_amount = await ss_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkTo = getExNetworkTo(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), r_address, destination_tag);
  } else {
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), TokenB_address);
  }
  const tmp_zec_address = ex_order?.depositAddress;

  const ss_order = await ss_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString(), '');

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
  } else {
    paying_address = ss_order?.address_from;
  }

  tokenA_xmr_orderID = ss_order?.id;
  xmr_tokenB_orderID = ex_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ss_order || !ex_order) return null;
  return content;
}
// completed ex_se
async function exchange_ex_to_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix to Stealthex

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  const networkTo = getExNetworkTo('ZEC');
  const { toAmount: estimated_zec_amount } = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, networkTo);

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange('zec', TokenB_symbol, r_address, parseFloat(estimated_zec_amount), destination_tag);
  } else {
    se_order = await se_create_new_exchange('zec', TokenB_symbol, TokenB_address, parseFloat(estimated_zec_amount), '');
  }
  const tmp_zec_address = se_order?.address_from;

  const networkFrom = getExNetworkTo(TokenA_sym);
  const ex_order = await ex_create_new_exchange(TokenA_symbol, 'ZEC', networkFrom, 'ZEC', TokenA_amount, tmp_zec_address);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
  } else {
    paying_address = ex_order?.depositAddress;
  }

  // const tx_status = await cn_get_exchange_info(se_order?.id);

  tokenA_xmr_orderID = ex_order?.id;
  xmr_tokenB_orderID = se_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ex_order || !se_order) return null;
  return content;
}
// completed se_ex
async function exchange_se_to_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Stealthex to Exolix

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  const estimated_zec_amount = await se_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkTo = getExNetworkTo(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), r_address, destination_tag);
  } else {
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', networkTo, parseFloat(estimated_zec_amount), TokenB_address);
  }
  const tmp_zec_address = ex_order?.depositAddress;

  const se_order = await se_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
  } else {
    paying_address = se_order?.address_from;
  }

  tokenA_xmr_orderID = se_order?.id;
  xmr_tokenB_orderID = ex_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'se_ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };

  if (!se_order || !ex_order) return null;
  return content;
}
// completed se_ss
async function exchange_se_to_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Stealthex to SimpleSwap

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  const estimated_xvg_amount = await se_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString());

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange('xvg', TokenB_symbol, r_address, parseFloat(estimated_xvg_amount), destination_tag);
  } else {
    ss_order = await ss_create_new_exchange('xvg', TokenB_symbol, TokenB_address, parseFloat(estimated_xvg_amount), '');
  }
  const tmp_xmr_address = ss_order?.address_from;

  const se_order = await se_create_new_exchange(TokenA_symbol, 'xvg', tmp_xmr_address, TokenA_amount, '');

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
  } else {
    paying_address = se_order?.address_from;
  }

  tokenA_xmr_orderID = se_order?.id;
  xmr_tokenB_orderID = ss_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount: TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount: TokenB_amount,
    TokenB_address: TokenB_address,
    paying_address: paying_address,
    exchange_flow: 'se_ss',
    tokenA_xmr_orderID: tokenA_xmr_orderID,
    xmr_tokenB_orderID: xmr_tokenB_orderID,
    creation_time: creation_time,
  };
  if (!se_order || !ss_order) return null;
  return content;
}
// completed ss_se
async function exchange_ss_to_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SimpleSwap to Stealthex

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  const estimated_xvg_amount = await ss_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString());

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange('xvg', TokenB_symbol, r_address, parseFloat(estimated_xvg_amount), destination_tag);
  } else {
    se_order = await se_create_new_exchange('xvg', TokenB_symbol, TokenB_address, parseFloat(estimated_xvg_amount), '');
  }
  const tmp_xmr_address = se_order?.address_from;

  const ss_order = await ss_create_new_exchange(TokenA_symbol, 'xvg', tmp_xmr_address, TokenA_amount.toString(), '');
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
  } else {
    paying_address = ss_order?.address_from;
  }

  tokenA_xmr_orderID = ss_order?.id;
  xmr_tokenB_orderID = se_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ss_order || !se_order) return null;
  return content;
}
// completed cn_se
async function exchange_cn_to_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow to Stealthex

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  const estimated_xvg_amount = await cn_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString());

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange('xvg', TokenB_symbol, r_address, parseFloat(estimated_xvg_amount), destination_tag);
  } else {
    se_order = await se_create_new_exchange('xvg', TokenB_symbol, TokenB_address, parseFloat(estimated_xvg_amount), '');
  }
  const tmp_xmr_address = se_order?.address_from;

  const cn_order = await cn_create_new_exchange(TokenA_symbol.toLowerCase(), 'xvg', tmp_xmr_address, TokenA_amount.toString(), '');
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
  } else {
    paying_address = cn_order?.payinAddress;
  }

  tokenA_xmr_orderID = cn_order?.id;
  xmr_tokenB_orderID = se_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!cn_order || !se_order) return null;
  return content;
}
// completed se_cn
async function exchange_se_to_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Stealthex to ChangeNow

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  const estimated_xvg_amount = (await se_get_exchange_amount(TokenA_symbol, 'xvg', TokenA_amount.toString())).estimated_amount;

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange('xvg', TokenB_symbol, r_address, parseFloat(estimated_xvg_amount), destination_tag);
  } else {
    cn_order = await cn_create_new_exchange('xvg', TokenB_symbol, TokenB_address, parseFloat(estimated_xvg_amount), '');
  }
  const tmp_xmr_address = cn_order?.payinAddress;

  const se_order = await se_create_new_exchange(TokenA_symbol, 'xvg', tmp_xmr_address, TokenA_amount.toString(), '');

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
  } else {
    paying_address = se_order?.address_from;
  }

  tokenA_xmr_orderID = se_order?.id;
  xmr_tokenB_orderID = cn_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!se_order || !cn_order) return null;
  return content;
}
// completed sp_cn
async function exchange_sp_to_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace to ChangeNow

  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork('ZEC');
  const { toAmount: estimated_zec_amount } = await sp_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount, networkTo, networkFrom);

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, r_address, estimated_zec_amount, destination_tag);
  } else {
    cn_order = await cn_create_new_exchange('zec', TokenB_symbol, TokenB_address, estimated_zec_amount);
  }
  const tmp_zec_address = cn_order?.payinAddress;

  // const networkFrom = getExNetworkTo(TokenA_sym);
  const sp_order = await sp_create_new_exchange(TokenA_symbol, 'zec', networkFrom, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
  } else {
    paying_address = sp_order?.from.address;
  }

  tokenA_xmr_orderID = sp_order?.id;
  xmr_tokenB_orderID = cn_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp_cn',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order || !cn_order) return null;
  return content;
}
// completed cn_sp
async function exchange_cn_to_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow to Swapspace

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  const estimated_zec_amount = await cn_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkFrom = getSpNetwork('ZEC');
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      'zec',
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(estimated_zec_amount),
      destination_tag,
    );
  } else {
    sp_order = await sp_create_new_exchange('zec', TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = sp_order?.from.address;

  const cn_order = await cn_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
  } else {
    paying_address = cn_order?.payinAddress;
  }

  tokenA_xmr_orderID = cn_order?.id;
  xmr_tokenB_orderID = sp_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'cn_sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!cn_order || !sp_order) return null;
  return content;
}
// completed sp_ss
async function exchange_sp_to_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace to SimpleSwap

  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork('ZEC');
  const { toAmount: estimated_zec_amount } = await sp_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount, networkTo, networkFrom);

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, r_address, estimated_zec_amount, destination_tag);
  } else {
    ss_order = await ss_create_new_exchange('zec', TokenB_symbol, TokenB_address, estimated_zec_amount);
  }
  const tmp_zec_address = ss_order?.address_from;

  // const networkFrom = getExNetworkTo(TokenA_sym);
  const sp_order = await sp_create_new_exchange(TokenA_symbol, 'zec', networkFrom, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
  } else {
    paying_address = sp_order?.from.address;
  }

  tokenA_xmr_orderID = sp_order?.id;
  xmr_tokenB_orderID = ss_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp_ss',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order || !ss_order) return null;
  return content;
}
// completed ss_sp
async function exchange_ss_to_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Simpleswap to Swapspace

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  const estimated_zec_amount = await ss_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkFrom = getSpNetwork('ZEC');
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      'zec',
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(estimated_zec_amount),
      destination_tag,
    );
  } else {
    sp_order = await sp_create_new_exchange('zec', TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = sp_order?.from.address;

  const ss_order = await ss_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
  } else {
    paying_address = ss_order?.address_from;
  }

  tokenA_xmr_orderID = ss_order?.id;
  xmr_tokenB_orderID = sp_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss_sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ss_order || !sp_order) return null;
  return content;
}
// completed sp_se
async function exchange_sp_to_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace to SimpleSwap
  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork('ZEC');
  const { toAmount: estimated_zec_amount } = await sp_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount, networkTo, networkFrom);

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange('zec', TokenB_symbol, r_address, estimated_zec_amount, destination_tag);
  } else {
    se_order = await se_create_new_exchange('zec', TokenB_symbol, TokenB_address, estimated_zec_amount);
  }
  const tmp_zec_address = se_order?.address_from;

  // const networkFrom = getExNetworkTo(TokenA_sym);
  const sp_order = await sp_create_new_exchange(TokenA_symbol, 'zec', networkFrom, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
  } else {
    paying_address = sp_order?.from.address;
  }

  tokenA_xmr_orderID = sp_order?.id;
  xmr_tokenB_orderID = se_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp_se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order || !se_order) return null;
  return content;
}
// completed se_sp
async function exchange_se_to_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Stealthex to Swapspace

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  const estimated_zec_amount = await se_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount.toString());

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkFrom = getSpNetwork('ZEC');
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      'zec',
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(estimated_zec_amount),
      destination_tag,
    );
  } else {
    sp_order = await sp_create_new_exchange('zec', TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = sp_order?.from.address;

  const se_order = await se_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
  } else {
    paying_address = se_order?.address_from;
  }

  tokenA_xmr_orderID = se_order?.id;
  xmr_tokenB_orderID = sp_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'se_sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!se_order || !sp_order) return null;
  return content;
}
// completed sp_ch
async function exchange_sp_to_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace to ChangeHero
  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork('ZEC');
  const { toAmount: estimated_zec_amount } = await sp_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount, networkTo, networkFrom);

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, r_address, destination_tag, estimated_zec_amount);
  } else {
    ch_order = await ch_create_new_exchange('zec', TokenB_symbol, TokenB_address, '', estimated_zec_amount);
  }
  const tmp_zec_address = ch_order?.result.payinAddress;

  // const networkFrom = getExNetworkTo(TokenA_sym);
  const sp_order = await sp_create_new_exchange(TokenA_symbol, 'zec', networkFrom, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
  } else {
    paying_address = sp_order?.from.address;
  }

  tokenA_xmr_orderID = sp_order?.id;
  xmr_tokenB_orderID = ch_order?.result.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp_ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order || !ch_order) return null;
  return content;
}
// completed ch_sp
async function exchange_ch_to_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeHero to Swapspace

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkFrom = getSpNetwork('ZEC');
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      'zec',
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(estimated_zec_amount),
      destination_tag,
    );
  } else {
    sp_order = await sp_create_new_exchange('zec', TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = sp_order?.from.address;

  const ch_order = await ch_create_new_exchange(TokenA_symbol, 'zec', tmp_zec_address, '', TokenA_amount.toString());
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
  } else {
    paying_address = ch_order?.result.payinAddress;
  }

  tokenA_xmr_orderID = ch_order?.result.id;
  xmr_tokenB_orderID = sp_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch_sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order || !sp_order) return null;
  return content;
}
// completed sp_ex
async function exchange_sp_to_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace to Exolix
  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork('ZEC');
  const { toAmount: estimated_zec_amount } = await sp_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount, networkTo, networkFrom);

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const exNetworkTo = getExNetworkTo(TokenB_sym);
  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', exNetworkTo, parseFloat(estimated_zec_amount), r_address, destination_tag);
  } else {
    ex_order = await ex_create_new_exchange('ZEC', TokenB_symbol, 'ZEC', exNetworkTo, parseFloat(estimated_zec_amount), TokenB_address);
  }
  const tmp_zec_address = ex_order?.depositAddress;

  // const networkFrom = getExNetworkTo(TokenA_sym);
  const sp_order = await sp_create_new_exchange(TokenA_symbol, 'zec', networkFrom, 'zec', tmp_zec_address, TokenA_amount);

  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
  } else {
    paying_address = sp_order?.from.address;
  }

  tokenA_xmr_orderID = sp_order?.id;
  xmr_tokenB_orderID = ex_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp_ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order || !ex_order) return null;
  return content;
}
// completed ex_sp
async function exchange_ex_to_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address, TokenB_amount) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix to Swapspace

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  const exNetworkTo = getExNetworkTo('ZEC');
  // const estimated_zec_amount = await ch_get_exchange_amount(TokenA_symbol, 'zec', TokenA_amount);
  const { toAmount: estimated_zec_amount } = await ex_get_exchange_amount(TokenA_symbol, 'ZEC', TokenA_amount, exNetworkTo);

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  const networkFrom = getSpNetwork('ZEC');
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      'zec',
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(estimated_zec_amount),
      destination_tag,
    );
  } else {
    sp_order = await sp_create_new_exchange('zec', TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(estimated_zec_amount));
  }
  const tmp_zec_address = sp_order?.from.address;

  const exNetworkFrom = getExNetworkTo(TokenA_sym);
  const ex_order = await ex_create_new_exchange(TokenA_symbol, 'ZEC', exNetworkFrom, 'ZEC', TokenA_amount, tmp_zec_address);
  if (TokenA_symbol == 'xrp') {
    paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
  } else {
    paying_address = ex_order?.depositAddress;
  }

  tokenA_xmr_orderID = ex_order?.id;
  xmr_tokenB_orderID = sp_order?.id;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex_sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ex_order || !sp_order) return null;
  return content;
}

// completed cn
async function exchange_cn(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // ChangeNow

  const TokenA_symbol = standardize_cn_symbol(TokenA_sym);
  const TokenB_symbol = standardize_cn_symbol(TokenB_sym);

  let cn_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    cn_order = await cn_create_new_exchange(TokenA_symbol, TokenB_symbol, r_address, parseFloat(TokenA_amount), destination_tag);
    paying_address = cn_order?.payinAddress;
  } else {
    cn_order = await cn_create_new_exchange(TokenA_symbol, TokenB_symbol, TokenB_address, parseFloat(TokenA_amount), '');
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(cn_order?.payinAddress, cn_order?.payinExtraId);
    } else {
      paying_address = cn_order?.payinAddress;
    }
  }

  if (TokenA_symbol == 'xvg') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = cn_order?.id;
  } else {
    tokenA_xmr_orderID = cn_order?.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = cn_order?.amount;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'cn',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!cn_order) return null;
  return content;
}
// completed ss
async function exchange_ss(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SimpleSwap

  const TokenA_symbol = standardize_ss_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ss_symbol(TokenB_sym);

  let ss_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ss_order = await ss_create_new_exchange(TokenA_symbol, TokenB_symbol, r_address, parseFloat(TokenA_amount), destination_tag);
    paying_address = ss_order?.address_from;
  } else {
    ss_order = await ss_create_new_exchange(TokenA_symbol, TokenB_symbol, TokenB_address, parseFloat(TokenA_amount), '');
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(ss_order?.address_from, ss_order?.extra_id_from);
    } else {
      paying_address = ss_order?.address_from;
    }
  }

  if (TokenA_symbol == 'xvg') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = ss_order?.id;
  } else {
    tokenA_xmr_orderID = ss_order?.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = ss_order?.amount_to;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ss',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ss_order) return null;
  return content;
}
// completed se
async function exchange_se(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // StealthEx

  const TokenA_symbol = standardize_se_symbol(TokenA_sym);
  const TokenB_symbol = standardize_se_symbol(TokenB_sym);

  let se_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    se_order = await se_create_new_exchange(TokenA_symbol, TokenB_symbol, r_address, parseFloat(TokenA_amount), destination_tag);
    paying_address = se_order?.address_from;
  } else {
    se_order = await se_create_new_exchange(TokenA_symbol, TokenB_symbol, TokenB_address, parseFloat(TokenA_amount), '');
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(se_order?.address_from, se_order?.extra_id_from);
    } else {
      paying_address = se_order?.address_from;
    }
  }

  if (TokenA_symbol == 'xvg') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = se_order?.id;
  } else {
    tokenA_xmr_orderID = se_order?.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = se_order?.amount_to;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'se',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!se_order) return null;
  return content;
}
// completed ex
async function exchange_ex(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Exolix

  const TokenA_symbol = standardize_ex_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ex_symbol(TokenB_sym);

  let ex_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';
  const networkFrom = getExNetworkTo(TokenA_sym);
  const networkTo = getExNetworkTo(TokenB_sym);

  if (TokenB_symbol === 'XRP') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ex_order = await ex_create_new_exchange(
      TokenA_symbol,
      TokenB_symbol,
      networkFrom,
      networkTo,
      parseFloat(TokenA_amount),
      r_address,
      destination_tag,
    );
    paying_address = ex_order?.depositAddress;
  } else {
    ex_order = await ex_create_new_exchange(TokenA_symbol, TokenB_symbol, networkFrom, networkTo, parseFloat(TokenA_amount), TokenB_address);
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(ex_order?.depositAddress, ex_order?.depositExtraId);
    } else {
      paying_address = ex_order?.depositAddress;
    }
  }

  if (TokenA_symbol === 'ZEC') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = ex_order?.id;
  } else {
    tokenA_xmr_orderID = ex_order?.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = ex_order?.amountTo;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ex',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ex_order) return null;
  return content;
}
// completed ch
async function exchange_ch(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // Changehero

  const TokenA_symbol = standardize_ch_symbol(TokenA_sym);
  const TokenB_symbol = standardize_ch_symbol(TokenB_sym);

  let ch_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';

  if (TokenB_symbol == 'xrp') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    ch_order = await ch_create_new_exchange(TokenA_symbol, TokenB_symbol, r_address, destination_tag, TokenA_amount);

    paying_address = ch_order?.result.payinAddress;
  } else {
    ch_order = await ch_create_new_exchange(TokenA_symbol, TokenB_symbol, TokenB_address, '', TokenA_amount);
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(ch_order?.result.payinAddress, ch_order?.result.payinExtraId);
    } else {
      paying_address = ch_order?.result.payinAddress;
    }
  }

  if (TokenA_symbol == 'xvg') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = ch_order?.result.id;
  } else {
    tokenA_xmr_orderID = ch_order?.result.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = ch_order?.result.amountExpectedTo;
  const creation_time = parseInt(Date.now() / 1000);
  const content = {
    TokenA_symbol,
    TokenA_amount,
    TokenB_symbol,
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'ch',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!ch_order) return null;
  return content;
}
// completed sp
async function exchange_sp(TokenA_sym, TokenA_amount, TokenB_sym, TokenB_address) {
  // ============= workflow: Create exchange, get deposit address, get price, create order, get order info
  // SwapSpace (Swapuz)

  const TokenA_symbol = standardize_sp_symbol(TokenA_sym);
  const TokenB_symbol = standardize_sp_symbol(TokenB_sym);

  let sp_order;
  let paying_address;
  let tokenA_xmr_orderID = '';
  let xmr_tokenB_orderID = '';
  const networkFrom = getSpNetwork(TokenA_sym);
  const networkTo = getSpNetwork(TokenB_sym);

  if (TokenB_symbol === 'XRP') {
    const { r_address, destination_tag } = await xrp_address_decode(TokenB_address);
    sp_order = await sp_create_new_exchange(
      TokenA_symbol,
      TokenB_symbol,
      networkFrom,
      networkTo,
      r_address,
      parseFloat(TokenA_amount),
      destination_tag,
    );
    paying_address = sp_order?.from.address;
  } else {
    sp_order = await sp_create_new_exchange(TokenA_symbol, TokenB_symbol, networkFrom, networkTo, TokenB_address, parseFloat(TokenA_amount));
    if (TokenA_symbol == 'xrp') {
      paying_address = await xrp_address_encode(sp_order?.from.address, sp_order?.from.extraId);
    } else {
      paying_address = sp_order?.from.address;
    }
  }

  if (TokenA_symbol === 'zec') {
    tokenA_xmr_orderID = '';
    xmr_tokenB_orderID = sp_order?.id;
  } else {
    tokenA_xmr_orderID = sp_order?.id;
    xmr_tokenB_orderID = '';
  }

  const TokenB_amount = sp_order?.to.amount;
  const creation_time = parseInt(Date.now() / 1000);

  const content = {
    TokenA_symbol: TokenA_symbol.toLowerCase(),
    TokenA_amount,
    TokenB_symbol: TokenB_symbol.toLowerCase(),
    TokenB_amount,
    TokenB_address,
    paying_address,
    exchange_flow: 'sp',
    tokenA_xmr_orderID,
    xmr_tokenB_orderID,
    creation_time,
  };
  if (!sp_order) return null;
  return content;
}

module.exports = {
  exchange_cn_to_ss,
  exchange_ss_to_cn,
  exchange_se_to_ss,
  exchange_ss_to_se,
  exchange_cn_to_se,
  exchange_se_to_cn,
  exchange_ex_to_cn,
  exchange_cn_to_ex,
  exchange_ex_to_ss,
  exchange_ss_to_ex,
  exchange_ex_to_se,
  exchange_se_to_ex,
  exchange_cn_to_ch,
  exchange_ch_to_cn,
  exchange_se_to_ch,
  exchange_ch_to_se,
  exchange_ss_to_ch,
  exchange_ch_to_ss,
  exchange_ex_to_ch,
  exchange_ch_to_ex,

  exchange_sp_to_cn,
  exchange_cn_to_sp,
  exchange_sp_to_ss,
  exchange_ss_to_sp,
  exchange_sp_to_se,
  exchange_se_to_sp,
  exchange_sp_to_ch,
  exchange_ch_to_sp,
  exchange_sp_to_ex,
  exchange_ex_to_sp,
  exchange_cn,
  exchange_ss,
  exchange_se,
  exchange_ex,
  exchange_ch,
  exchange_sp,
};
