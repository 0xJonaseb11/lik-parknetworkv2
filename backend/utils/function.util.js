const axios = require('axios');
const uuid4 = require('uuid4');

const {
  price_ss_to_cn,
  price_cn_to_ss,
  price_se_to_cn,
  price_cn_to_se,
  price_ss_to_se,
  price_se_to_ss,
  price_cn_to_ex,
  price_ex_to_cn,
  price_ch_to_cn,
  price_cn_to_ch,
  price_ss_to_ex,
  price_ss_to_ch,
  price_ex_to_ss,
  price_ch_to_ss,
  price_se_to_ex,
  price_ex_to_se,
  price_se_to_ch,
  price_ch_to_se,
  price_ex_to_ch,
  price_ch_to_ex,
  price_cn,
  price_ss,
  price_se,
  price_ex,
  price_ch,
  price_sp,
  price,
} = require('./priceQuote');

async function xrp_address_encode(r_address, destination_tag) {
  try {
    const url = `https://xrpaddress.info/api/encode/${r_address}/${destination_tag}`;
    const response = await axios.get(url);
    const x_address = response.data.address;
    return x_address;
  } catch (error) {
    console.error(`Error encoding XRP address: ${error}`);
    throw new Error('Error encoding XRP address');
  }
}

async function xrp_address_decode(x_address) {
  if (x_address.toLowerCase().startsWith('r')) {
    const r_address = x_address;
    const destination_tag = '';
    return {
      r_address: r_address,
      destination_tag: destination_tag,
    };
  } else {
    try {
      const url = `https://xrpaddress.info/api/decode/${x_address}`;
      const response = await axios.get(url);
      const r_address = response.data.account;
      const destination_tag = response.data.tag;
      return {
        r_address: r_address,
        destination_tag: destination_tag,
      };
    } catch (error) {
      console.error(`Error decoding XRP address: ${error}`);
      throw new Error('Error decoding XRP address');
    }
  }
}

async function se_get_all_currencies() {
  try {
    const url = `${process.env.SE_API_URL}currency?api_key=${process.env.SE_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error while getting exchange currencies in stealthex: ${error}`);
    return null;
  }
}

async function ss_get_exchange_pairs(symbol) {
  try {
    const url = `${process.env.SS_API_URL}get_pairs?api_key=${process.env.SS_API_KEY}&fixed=false&symbol=${symbol}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error while getting exchange pairs in simpleswap: ${error}`);
    return null;
  }
}

function convertArrayToObjects(arrays) {
  return arrays.map((arr) => {
    const [to_amount, min_amount, max_amount, exchange_flow] = arr;
    return {
      to_amount,
      min_amount,
      max_amount,
      exchange_flow,
    };
  });
}

/**
 * Retrieves a list of price quotes from different price quoting services
 * based on the given parameters.
 *
 * @param {number} TokenA_amount - The amount of the source token being traded
 * @param {string} TokenA_symbol - The symbol of the source token
 * @param {string} TokenB_symbol - The symbol of the destination token
 * @returns {Promise<Array>} - A Promise that resolves to an array of price quotes
 */
const getPrice = (TokenA_amount, TokenA_symbol, TokenB_symbol, is_anon) => {
  const isAnonymous = JSON.parse(is_anon.toLowerCase());
  // console.log('====================================');
  // console.log('tokenA_amount: ' + TokenA_amount);
  // console.log('tokenA_symbol: ' + TokenA_symbol);
  // console.log('tokenB_symbol: ' + TokenB_symbol);
  // console.log('is_anon: ' + is_anon);
  // console.log('isAnonymous: ' + isAnonymous);
  // console.log('====================================');
  return new Promise((resolve, reject) => {
    const priceQuotingArray = [];

    const isXVG = TokenA_symbol === 'XVG' || TokenB_symbol === 'XVG';
    const isZEC = TokenA_symbol === 'ZEC' || TokenB_symbol === 'ZEC';
    const isCNEnabled = process.env.CN_ENABLE;
    const isSSEnabled = process.env.SS_ENABLE;
    const isSEEnabled = process.env.SE_ENABLE;
    const isEXEnabled = process.env.EX_ENABLE;
    const isCHEnabled = process.env.CH_ENABLE;
    const isSPEnabled = process.env.SP_ENABLE;

    if (isZEC || isXVG || !isAnonymous) {
      if (isCNEnabled) {
        priceQuotingArray.push(price_cn(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSSEnabled) {
        priceQuotingArray.push(price_ss(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSEEnabled) {
        priceQuotingArray.push(price_se(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isEXEnabled) {
        priceQuotingArray.push(price_ex(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isCHEnabled) {
        priceQuotingArray.push(price_ch(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSPEnabled) {
        priceQuotingArray.push(price_sp(TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
    } else {
      if (isCNEnabled && isSSEnabled) {
        priceQuotingArray.push(price('cn', 'ss', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
        priceQuotingArray.push(price('ss', 'cn', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
      }
      if (isCNEnabled && isSEEnabled) {
        priceQuotingArray.push(price('se', 'cn', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
        priceQuotingArray.push(price('cn', 'se', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
      }
      if (isCNEnabled && isEXEnabled) {
        priceQuotingArray.push(price('cn', 'ex', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ex', 'cn', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isCNEnabled && isCHEnabled) {
        priceQuotingArray.push(price('cn', 'ch', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ch', 'cn', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSSEnabled && isSEEnabled) {
        priceQuotingArray.push(price('ss', 'se', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
        priceQuotingArray.push(price('se', 'ss', TokenA_amount, TokenA_symbol, TokenB_symbol, 'XVG'));
      }
      if (isSSEnabled && isEXEnabled) {
        priceQuotingArray.push(price('ss', 'ex', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ex', 'ss', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSSEnabled && isCHEnabled) {
        priceQuotingArray.push(price('ss', 'ch', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ch', 'ss', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSEEnabled && isEXEnabled) {
        priceQuotingArray.push(price('se', 'ex', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ex', 'se', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSEEnabled && isCHEnabled) {
        priceQuotingArray.push(price('se', 'ch', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ch', 'se', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isEXEnabled && isCHEnabled) {
        priceQuotingArray.push(price('ex', 'ch', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ch', 'ex', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }

      if (isSPEnabled && isEXEnabled) {
        priceQuotingArray.push(price('sp', 'ex', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ex', 'sp', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSPEnabled && isCNEnabled) {
        priceQuotingArray.push(price('sp', 'cn', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('cn', 'sp', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSPEnabled && isCHEnabled) {
        priceQuotingArray.push(price('sp', 'ch', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ch', 'sp', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSPEnabled && isSEEnabled) {
        priceQuotingArray.push(price('sp', 'se', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('se', 'sp', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
      if (isSPEnabled && isSSEnabled) {
        priceQuotingArray.push(price('sp', 'ss', TokenA_amount, TokenA_symbol, TokenB_symbol));
        priceQuotingArray.push(price('ss', 'sp', TokenA_amount, TokenA_symbol, TokenB_symbol));
      }
    }

    Promise.all(priceQuotingArray)
      .then((resultArr) => {
        const priceList = resultArr
          .filter((item) => !isNaN(item[0]))
          .sort((a, b) => {
            if (a[0] !== b[0]) {
              return b[0] - a[0];
            } else if (a[2] < 0 && b[2] >= 0) {
              return 1;
            } else if (a[2] >= 0 && b[2] < 0) {
              return -1;
            } else {
              return b[2] - a[2];
            }
          });
        console.log('priceList//////////////////', priceList);

        resolve(priceList);
      })
      .catch((error) => {
        console.error(`An error occurred while sorting the price: ${error}`);
        reject(error);
      });
  });
};

/**
 * Generates a new API key using UUIDv4.
 * @returns {string} The generated API key.
 */
const generateApiKey = () => {
  return uuid4();
};

module.exports = {
  xrp_address_encode,
  xrp_address_decode,
  se_get_all_currencies,
  ss_get_exchange_pairs,
  convertArrayToObjects,
  getPrice,
  generateApiKey,
};
