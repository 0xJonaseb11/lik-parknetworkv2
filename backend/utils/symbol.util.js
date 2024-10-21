/**
 *
 * Returns the standardized symbol for a given token symbol on the ChangeNow.
 * @param {string} token_symbol - The token symbol to standardize.
 * @returns {string} The standardized token symbol.
 */
function standardize_cn_symbol(token_symbol) {
  switch (token_symbol) {
    case 'BNB':
      return 'bnbbsc';
    case 'USDT':
      return 'usdterc20';
    case 'USDTTRC':
      return 'usdttrc20';
    case 'USDTPOLY':
      return 'usdtmatic';
    case 'USDTSPL':
      return 'usdtsol';
    case 'USDCTRC':
      return 'usdctrc20';
    case 'USDCPOLY':
      return 'usdcmatic';
    case 'USDCSPL':
      return 'usdcsol';
    case 'BUSDETH':
      return 'busd';
    case 'MATIC':
      return 'maticmainnet';
    case 'MATICETH':
      return 'matic';
    case 'CRO':
      return 'croevm';
    default:
      return token_symbol.toLowerCase();
  }
}

/**
 *
 * Returns the standardized symbol for a given token symbol on the SimpleSwap.
 * @param {string} token_symbol - The token symbol to standardize.
 * @returns {string} The standardized token symbol.
 */
function standardize_ss_symbol(token_symbol) {
  switch (token_symbol) {
    case 'BSC':
      return 'bnb-bsc';
    case 'USDT':
      return 'usdterc20';
    case 'USDTTRC':
      return 'usdttrc20';
    case 'USDTBSC':
      return 'usdtbep20';
    case 'USDCBSC':
      return 'usdcbep20';
    case 'USDCTRC':
      return 'usdctrc20';
    case 'BUSDBSC':
      return 'busd';
    case 'DAIBSC':
      return 'daibep20';
    case 'BUSDETH':
      return 'busderc20';
    case 'MATIC':
      return 'matic';
    case 'MATICETH':
      return 'maticerc20';
    case 'UNIBSC':
      return 'unibep20';
    case 'CRO':
      return 'cromainnet';
    default:
      return token_symbol.toLowerCase();
  }
}

/**
 *
 * Returns the standardized symbol for a given token symbol on the StealthEx.
 * @param {string} token_symbol - The token symbol to standardize.
 * @returns {string} The standardized token symbol.
 */
function standardize_se_symbol(token_symbol) {
  switch (token_symbol) {
    case 'BNB':
      return 'bnbbsc';
    case 'USDT':
      return 'usdterc20';
    case 'USDTTRC':
      return 'usdttrc20';
    case 'USDTSPL':
      return 'usdtsol';
    case 'USDCTRC':
      return 'usdctrc20';
    case 'USDCSPL':
      return 'usdcsol';
    case 'BUSDBSC':
      return 'busd';
    case 'DAIBSC':
      return 'daibep20';
    case 'CRO':
      return 'cromainnet';
    case 'BUSDETH':
      return 'busderc20';
    case 'MATIC':
      return 'matic';
    case 'MATICETH':
      return 'maticerc20';
    default:
      return token_symbol.toLowerCase();
  }
}

function standardize_ex_symbol(token_symbol) {
  switch (token_symbol) {
    case 'LINAERC20':
      return 'LINA';
    case 'ETHARB':
    case 'ETHBSC':
      return 'ETH';
    case 'USDTTRC':
    case 'USDTSPL':
    case 'USDTARB':
      return 'USDT';
    case 'USDCSPL':
    case 'USDCTRC':
      return 'USDC';
    case 'FLOKIBSC':
      return 'FLOKI';
    default:
      return token_symbol.toUpperCase();
  }
}

// function standardize_sp_symbol(token_symbol) {
//   switch (token_symbol) {
//     case 'BSC':
//       return 'bnb';
//     case 'ADABSC':
//       return 'ada';
//     case 'APEBSC':
//       return 'ape';
//     case 'BUSDBSC':
//     case 'BUSDETH':
//     case 'BUSDMATIC':
//       return 'busd';
//     case 'ETHARB':
//     case 'ETHBSC':
//       return 'eth';
//     case 'LINKBSC':
//     case 'LINKARB':
//       return 'link';
//     case 'LTCBSC':
//       return 'ltc';
//     case 'TRXBSC':
//       return 'trx';
//     case 'USDTTRC':
//     case 'USDTSPL':
//     case 'USDTARB':
//     case 'USDTBSC':
//     case 'USDTALGO':
//     case 'USDTPOLY':
//       return 'usdt';
//     case 'USDCSPL':
//     case 'USDCTRC':
//     case 'USDCALGO':
//     case 'USDCARB':
//     case 'USDCBSC':
//     case 'USDCPOLY':
//       return 'usdc';
//     case 'DAIBSC':
//     case 'DAIMATIC':
//     case 'DAIARB':
//       return 'dai';
//     case 'FLOKIBSC':
//       return 'floki';
//     case 'EGLDBSC':
//       return 'egld';
//     case 'SOLBSC':
//       return 'sol';
//     case 'MATICBSC':
//     case 'MATICETH':
//       return 'matic';
//     case 'WBTCARB':
//       return 'wbtc';
//     case 'XRPBSC':
//       return 'xrp';
//     case 'FTMBSC':
//       return 'ftm';
//     case 'UNIBSC':
//     case 'UNIARB':
//       return 'uni';
//     default:
//       return token_symbol.toLowerCase();
//   }
// }

function standardize_sp_symbol(sym) {
  const token_symbol = sym.toLowerCase();
  const networkSuffixes = ['bsc', 'matic', 'eth', 'trc', 'spl', 'sol', 'algo', 'poly', 'arb'];
  for (const suffix of networkSuffixes) {
    if (token_symbol === suffix) {
      return token_symbol.toLowerCase();
    }
    if (token_symbol.endsWith(suffix)) {
      return token_symbol.substring(0, token_symbol.length - suffix.length).toLowerCase(); // e.g: MATICETH => matic
    }
  }
  return token_symbol.toLowerCase();
}

function getSpNetwork(token_symbol) {
  /* Tokens list that have more than one network in EX
    ETH, USDT, ALICE, ALPHA, ANKR, ARB, AVAX, BABYDOGE, BAND, BRZ, C98, DAR, FLOKI, GMX, ID, INJ, LOOM, REEF, SWEAT, TLOS, TUSD, USDC, USDD, WBT
  */
  switch (token_symbol) {
    case 'USDCALGO':
    case 'USDTALGO':
      return 'algo';
    case 'ETH':
      return 'eth';
    case 'MATIC':
    case 'BUSDMATIC':
    case 'USDTPOLY':
    case 'SANDMATIC':
    case 'USDCPOLY':
    case 'DAIMATIC':
      return 'polygon';
    case 'USDC':
    case 'LINK':
    case 'SHIB':
    case 'ELON':
    case 'RPL':
    case 'SAND':
    case 'MANA':
    case 'ENJ':
    case 'FLOKI':
    case 'UTK':
    case 'TAMA':
    case 'APE':
    case 'BONE':
    case 'USDT':
    case 'DAI':
    case 'AAVE':
    case 'UOS':
    case 'BUSDETH':
    case 'GODS':
    case 'DYDX':
    case 'MATICETH':
    case 'WBTC':
    case 'UNI':
    case 'IMX':
    case 'EARN':
      return 'erc20';
    case 'BUSDBSC':
    case 'FLOKIBSC':
    case 'LTCBSC':
    case 'USDTBSC':
    case 'FTMBSC':
    case 'AVAXBSC':
    case 'BNB':
    case 'DAIBSC':
    case 'SOLBSC':
    case 'CAKE':
    case 'UNIBSC':
    case 'SHIBBSC':
    case 'USDCBSC':
    case 'ADABSC':
    case 'XRPBSC':
    case 'TRXBSC':
    case 'SANDBSC':
    case 'AAVEBSC':
    case 'MATICBSC':
    case 'LINKBSC':
    case 'MANABSC':
    case 'EGLDBSC':
    case 'APEBSC':
    case 'ETHBSC':
    case 'RISE':
      return 'bep20';
    case 'USDTTRC':
    case 'USDCTRC':
      return 'trc20';
    case 'TRX':
      return 'trx';
    case 'XRP':
      return 'xrp';
    case 'ETHARB':
    case 'USDTARB':
      return 'arbitrum';
    case 'USDCSOL':
    case 'USDTSOL':
      return 'sol';
    default:
      return token_symbol.toLowerCase(); // BTC, ALGO, EGLD, APT, DOGE, SUI, AVAX, ...
  }
}

function standardize_ch_symbol(token_symbol) {
  switch (token_symbol) {
    case 'BNB':
      return 'bnbbsc';
    case 'USDTTRC':
      return 'usdttrc20';
    case 'USDTPOLY':
      return 'usdtpolygon';
    case 'USDCPOLY':
      return 'usdcpolygon';
    case 'FTM':
      return 'ftmmainnet';
    case 'USDTSPL':
      return 'usdtsol';
    case 'USDCSPL':
      return 'usdcsol';
    case 'USDT':
      return 'usdt20';
    case 'MATIC':
      return 'maticpolygon';
    case 'MATICETH':
      return 'matic';
    case 'DAIMATIC':
      return 'daipolygon';
    case 'FTM':
      return 'ftmmainnet';
    case 'ARB':
      return 'arbarb';
    /* 
      CRO(mainnet) doesn't exist in ch available currencies
      we have CRO(mainnet), ch has cro(erc-20)
      param name is same, but actually different token
    */
    case 'CRO':
      return 'croevm';
    default:
      return token_symbol.toLowerCase();
  }
}

function getExNetworkTo(token_symbol) {
  /* Tokens list that have more than one network in EX
    ETH, USDT, ALICE, ALPHA, ANKR, ARB, AVAX, BABYDOGE, BAND, BRZ, C98, DAR, FLOKI, GMX, ID, INJ, LOOM, REEF, SWEAT, TLOS, TUSD, USDC, USDD, WBT
  */
  switch (token_symbol) {
    case 'MATIC':
    case 'BUSDMATIC':
    case 'USDTPOLY':
    case 'SANDMATIC':
    case 'USDCPOLY':
    case 'DAIMATIC':
      return 'POLYGON';
    case 'USDC':
    case 'ETH':
    case 'LINK':
    case 'SHIB':
    case 'ELON':
    case 'RPL':
    case 'SAND':
    case 'MANA':
    case 'ENJ':
    case 'FLOKI':
    case 'UTK':
    case 'TAMA':
    case 'APE':
    case 'BONE':
    case 'USDT':
    case 'DAI':
    case 'AAVE':
    case 'UOS':
    case 'BUSDETH':
    case 'GODS':
    case 'DYDX':
    case 'MATICETH':
    case 'WBTC':
    case 'UNI':
    case 'IMX':
    case 'EARN':
      return 'ETH';
    case 'BUSDBSC':
    case 'FLOKIBSC':
    case 'LTCBSC':
    case 'USDTBSC':
    case 'FTMBSC':
    case 'AVAXBSC':
    case 'BNB':
    case 'DAIBSC':
    case 'SOLBSC':
    case 'CAKE':
    case 'UNIBSC':
    case 'SHIBBSC':
    case 'USDCBSC':
    case 'ADABSC':
    case 'XRPBSC':
    case 'TRXBSC':
    case 'SANDBSC':
    case 'AAVEBSC':
    case 'MATICBSC':
    case 'LINKBSC':
    case 'MANABSC':
    case 'EGLDBSC':
    case 'APEBSC':
    case 'ETHBSC':
    case 'RISE':
      return 'BSC';
    case 'USDTTRC':
    case 'USDCTRC':
    case 'TRX':
      return 'TRX';
    case 'XRP':
      return 'XRP';
    case 'ETHARB':
    case 'USDTARB':
      return 'ARBITRUM';
    case 'USDCSOL':
    case 'USDTSOL':
      return 'SOL';
    default:
      return token_symbol.toUpperCase(); // BTC, ALGO, EGLD, APT, DOGE, SUI, AVAX, ...
  }
}

/**
 *
 *Returns the standardized symbol for a given token symbol on any network.
 *@param {string} token_symbol - The token symbol to standardize.
 *@returns {string} The standardized token symbol.
 */
function standardize_all_symbols(token_symbol) {
  const input_symbol = token_symbol.toLowerCase();
  switch (input_symbol) {
    case 'bnbbsc':
    case 'bsc':
    case 'bnb-bsc':
      return 'BNB';
    case 'usdterc20':
      return 'USDT';
    case 'usdttrc20':
      return 'USDTTRC';
    case 'usdtspl':
    case 'usdtsol':
      return 'USDTSPL';
    case 'usdtmatic':
      return 'USDTPOLY';
    case 'usdctrc20':
      return 'USDCTRC';
    case 'usdcspl':
    case 'usdcsol':
      return 'USDCSPL';
    case 'usdcmatic':
      return 'USDCPOLY';
    case 'daieth':
      return 'DAI';
    case 'usdtbep20':
      return 'USDTBSC';
    case 'usdcbep20':
      return 'USDCBSC';
    case 'busdbsc':
    case 'busd':
      return 'BUSD';
    case 'daibep20':
      return 'DAIBSC';
    case 'cromainnet':
    case 'croevm':
      return 'CRO';
    case 'busderc20':
      return 'BUSDETH';
    case 'maticmainnet':
      return 'MATIC';
    case 'maticerc20':
      return 'MATICETH';
    case 'unibep20':
      return 'UNIBSC';
    default:
      return input_symbol.toUpperCase();
  }
}

/**
 *
 * Converts the input status symbol to its corresponding numerical value
 * @param {string|number} status_symbol - The input status symbol to be converted
 * @returns {number} The numerical value of the input status symbol
 */
function convert_status_symbol(status_symbol) {
  let status = 0;
  if (['new', 'wait', 'waiting', 'NEW', 0].includes(status_symbol)) {
    status = 0;
  } else if (['confirming', 'confirmation', 'confirmed', 'PENDING', 1].includes(status_symbol)) {
    status = 1;
  } else if (['exchanging', 'EXCHANGE', 2].includes(status_symbol)) {
    status = 2;
  } else if (['sending', 'WITHDRAW', 3].includes(status_symbol)) {
    status = 3;
  } else if (['finished', 'success', 'DONE', 4].includes(status_symbol)) {
    status = 4;
  } else if (['expired', 'overdue', 'deposit timeout', 'hold', 'verifying', 'EXPIRED', 5].includes(status_symbol)) {
    status = 5;
  } else if (['failed', 'EMERGENCY', 'refunded', 6, 7].includes(status_symbol)) {
    status = 6;
  }
  return status;
}

/**
 *
 * Converts the input status of the input transaction to its final status
 * @param {number} inStatus - The input status of the input transaction
 * @param {number} outStatus - The output status of the input transaction
 * @returns {number} The final status of the transaction
 */
function convert_final_status(inStatus, outStatus) {
  let status = 0;
  if (inStatus === 0) {
    status = 0;
  } else if (inStatus === 1) {
    status = 1;
  } else if (inStatus >= 2 && inStatus <= 3) {
    status = 2;
  } else if (inStatus === 4) {
    if (outStatus >= 0 && outStatus <= 3) {
      status = 3;
    } else if (outStatus === 4) {
      status = 4;
    } else if (outStatus === 5) {
      status = 5;
    } else if (outStatus === 6) {
      status = 6;
    }
  } else if (inStatus === 5) {
    status = 5;
  } else if (inStatus === 6) {
    status = 6;
  }
  return status;
}

module.exports = {
  standardize_cn_symbol,
  standardize_ss_symbol,
  standardize_se_symbol,
  standardize_ex_symbol,
  standardize_sp_symbol,
  standardize_ch_symbol,
  getExNetworkTo,
  getSpNetwork,
  standardize_all_symbols,
  convert_status_symbol,
  convert_final_status,
};
