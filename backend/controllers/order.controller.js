const { createOrderOne, getOrderOne, updateOrderOne } = require('../services/order.service');
const { getNetworkOne, getTokenOne } = require('../services/quote.service');
const { standardize_all_symbols, convert_status_symbol, convert_final_status } = require('../utils/symbol.util');
const { getPrice } = require('../utils/function.util');
const {
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
} = require('../utils/exchange.util');

const { registerCall } = require('../services/admin.service');
const {
  cn_get_exchange_info,
  ss_get_exchange_info,
  se_get_exchange_info,
  ex_get_exchange_info,
  ch_get_exchange_info,
  sp_get_exchange_info,
} = require('../utils/api.util');

async function create(req, res) {
  try {
    const { from_amount, to_address, from_symbol, to_symbol, is_anon, source = '', domain = '', chatId = '' } = req.body;

    if (!from_amount || !to_address || !from_symbol || !to_symbol) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });
    }

    // Map BNB symbol to BSC.
    // const mappedTokenA = from_symbol === 'BNB' ? 'BSC' : from_symbol;
    // const mappedTokenB = to_symbol === 'BNB' ? 'BSC' : to_symbol;

    let exchangeContent = {};

    // Get the exchange flow list.
    const exchangeFlowList = await Promise.race([getPrice(from_amount, from_symbol, to_symbol, is_anon)]);
    console.log('exchangeFlowList==>>>>', exchangeFlowList);
    /* 
    exchangeFlowList==>>>> [
      [ 10.9989335, 0.0017660688, -0.1363768587199841, 'se_ss' ],
      [ 10.965107, 0.0017660688, -1, 'se_cn' ],
      [ 10.9649273, 0.002336958, -1, 'ss_cn' ],
      [ -1, 0.001731, -0.1366026674366443, 'cn_ss' ],
      [ NaN, 0.002336958, NaN, 'ss_se' ],
      [ -1, 0.0017896781155089245, -1, 'cn_se' ]
    ]
    */

    for (let i = 0; i < exchangeFlowList.length; i++) {
      // console.log('****************************', i);
      const exchangeFlow = exchangeFlowList[i][3];
      const TokenB_amount = exchangeFlowList[i][0];

      try {
        if (is_anon === 'true') {
          switch (exchangeFlow) {
            case 'cn_ss':
              exchangeContent = await exchange_cn_to_ss(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ss_cn':
              exchangeContent = await exchange_ss_to_cn(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'se_ss':
              exchangeContent = await exchange_se_to_ss(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ss_se':
              exchangeContent = await exchange_ss_to_se(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'cn_se':
              exchangeContent = await exchange_cn_to_se(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'se_cn':
              exchangeContent = await exchange_se_to_cn(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ex_cn':
              exchangeContent = await exchange_ex_to_cn(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'cn_ex':
              exchangeContent = await exchange_cn_to_ex(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ex_ss':
              exchangeContent = await exchange_ex_to_ss(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ss_ex':
              exchangeContent = await exchange_ss_to_ex(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ex_se':
              exchangeContent = await exchange_ex_to_se(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'se_ex':
              exchangeContent = await exchange_se_to_ex(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'cn_ch':
              exchangeContent = await exchange_cn_to_ch(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ch_cn':
              exchangeContent = await exchange_ch_to_cn(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'se_ch':
              exchangeContent = await exchange_se_to_ch(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ch_se':
              exchangeContent = await exchange_ch_to_se(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ss_ch':
              exchangeContent = await exchange_ss_to_ch(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ch_ss':
              exchangeContent = await exchange_ch_to_ss(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ex_ch':
              exchangeContent = await exchange_ex_to_ch(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ch_ex':
              exchangeContent = await exchange_ch_to_ex(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;

            case 'sp_cn':
              exchangeContent = await exchange_sp_to_cn(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'cn_sp':
              exchangeContent = await exchange_cn_to_sp(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'sp_ss':
              exchangeContent = await exchange_sp_to_ss(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ss_sp':
              exchangeContent = await exchange_ss_to_sp(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'sp_se':
              exchangeContent = await exchange_sp_to_se(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'se_sp':
              exchangeContent = await exchange_se_to_sp(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'sp_ch':
              exchangeContent = await exchange_sp_to_ch(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ch_sp':
              exchangeContent = await exchange_ch_to_sp(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'sp_ex':
              exchangeContent = await exchange_sp_to_ex(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;
            case 'ex_sp':
              exchangeContent = await exchange_ex_to_sp(from_symbol, from_amount, to_symbol, to_address, TokenB_amount);
              break;

            default:
              throw new Error(`Unsupported exchange flow: ${exchangeFlow}`);
          }
        } else {
          console.log('is_anon', is_anon);
          switch (exchangeFlow) {
            case 'cn':
              exchangeContent = await exchange_cn(from_symbol, from_amount, to_symbol, to_address);
              break;
            case 'ss':
              exchangeContent = await exchange_ss(from_symbol, from_amount, to_symbol, to_address);
              break;
            case 'se':
              exchangeContent = await exchange_se(from_symbol, from_amount, to_symbol, to_address);
              break;
            case 'ex':
              exchangeContent = await exchange_ex(from_symbol, from_amount, to_symbol, to_address);
              break;
            case 'ch':
              exchangeContent = await exchange_ch(from_symbol, from_amount, to_symbol, to_address);
              break;
            case 'sp':
              exchangeContent = await exchange_sp(from_symbol, from_amount, to_symbol, to_address);
              break;
            default:
              throw new Error(`Unsupported exchange flow: ${exchangeFlow}`);
          }
        }
        if (!exchangeContent) continue;
        const [fromTokenData, toTokenData] = await Promise.all([getTokenOne({ name: from_symbol }), getTokenOne({ name: to_symbol })]);

        const createdBy = source === '' && req.apiKey ? req.apiKey : source;

        const payload = {
          tokenA_symbol: standardize_all_symbols(exchangeContent?.TokenA_symbol),
          tokenA_amount: exchangeContent?.TokenA_amount,
          tokenA_network: fromTokenData?.networkId,
          tokenB_symbol: standardize_all_symbols(exchangeContent?.TokenB_symbol),
          tokenB_amount: exchangeContent?.TokenB_amount,
          tokenB_address: exchangeContent?.TokenB_address,
          tokenB_network: toTokenData?.networkId,
          paying_address: exchangeContent?.paying_address,
          exchange_flow: exchangeContent?.exchange_flow,
          tokenA_xmr_orderID: exchangeContent?.tokenA_xmr_orderID,
          xmr_tokenB_orderID: exchangeContent?.xmr_tokenB_orderID,
          is_anon: is_anon,
          creation_time: exchangeContent?.creation_time,
          source: source === '' && req.apiKey ? 'External API' : source,
          domain: domain === '' && req.apiKey ? req.headers.origin : domain,
          chatId,
          createdBy,
        };
        // console.log('payload=============================', payload)

        const newOrderData = await createOrderOne(payload);
        // console.log('newOrderData=============================', newOrderData)

        await registerCall(req.apiKey, req.body, newOrderData, '/api/v1/orders', 'POST');

        return res.status(200).json({
          code: 200,
          message: 'Success',
          data: {
            egSpectreId: newOrderData?._id,
          },
        });
      } catch (error) {
        console.error(error);
        continue;
      }
    }

    return res.status(400).json({
      code: 400,
      message: 'No exchange flow succeeded',
    });
  } catch (error) {
    console.error(`An error occurred while creating the order: ${error}`);
    return res.status(500).json({
      code: 500,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    // console.log(req.params);

    const orderInfo = await getOrderOne({ _id: id });
    if (!orderInfo) {
      return res.status(404).json({
        code: 404,
        message: 'The order was not found',
      });
    }

    const [fromNetworkData, toNetworkData] = await Promise.all([
      getNetworkOne({ _id: orderInfo.tokenA_network }),
      getNetworkOne({ _id: orderInfo.tokenB_network }),
    ]);
    // console.log("fromNetworkData======", fromNetworkData);
    // console.log("toNetworkData======", toNetworkData);

    const { exchange_flow, order_status } = orderInfo;

    const egswap_orderInfo = {
      orderId: orderInfo._id,
      from_symbol: orderInfo.tokenA_symbol,
      from_amount: orderInfo.tokenA_amount,
      from_network: {
        logo: fromNetworkData?.logo,
        name: fromNetworkData?.name,
        protocol: fromNetworkData?.protocol,
      },
      to_symbol: orderInfo.tokenB_symbol,
      to_amount: orderInfo.tokenB_amount,
      to_address: orderInfo.tokenB_address,
      to_network: {
        logo: toNetworkData?.logo,
        name: toNetworkData?.name,
        protocol: toNetworkData?.protocol,
      },
      paying_address: orderInfo.paying_address,
      is_anon: orderInfo.is_anon,
      creation_time: orderInfo.creation_time,
    };

    let finalStatus,
      cn_orderID,
      cn_orderInfo,
      ss_orderID,
      ss_orderInfo,
      se_orderID,
      se_orderInfo,
      ex_orderID,
      ex_orderInfo,
      ch_orderID,
      ch_orderInfo,
      sp_orderID,
      sp_orderInfo,
      inStatus,
      outStatus;

    switch (exchange_flow) {
      case 'cn_ss':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ss_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_cn':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, cn_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'ss_se':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, se_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_ss':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ss_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'cn_se':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, se_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_cn':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, cn_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;

      case 'ex_cn':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, cn_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'cn_ex':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ex_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_se':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, se_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_ex':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ex_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_ss':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, ss_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_ex':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, ex_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;

      case 'cn_ch':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ch_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_cn':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, cn_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'se_ch':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ch_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_se':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, se_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'ss_ch':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, ch_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_ss':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, ss_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ex_ch':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, ch_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_ex':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, ex_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;

      case 'sp_cn':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, cn_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'cn_sp':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, sp_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_se':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, se_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_sp':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, sp_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ss':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ss_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_sp':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, sp_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ex':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ex_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_sp':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, sp_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ch':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ch_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_sp':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, sp_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;

      case 'cn':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderInfo = await cn_get_exchange_info(cn_orderID);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'ss':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderInfo = await ss_get_exchange_info(ss_orderID);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'se':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderInfo = await se_get_exchange_info(se_orderID);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'ex':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderInfo = await ex_get_exchange_info(ex_orderID);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ch':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderInfo = await ch_get_exchange_info(ch_orderID);
        inStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'sp':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderInfo = await sp_get_exchange_info(sp_orderID);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      default:
        break;
    }

    if (
      exchange_flow === 'cn' ||
      exchange_flow === 'ss' ||
      exchange_flow === 'se' ||
      exchange_flow === 'ex' ||
      exchange_flow === 'ch' ||
      exchange_flow === 'sp'
    ) {
      finalStatus = inStatus;
    } else finalStatus = convert_final_status(inStatus, outStatus);
    // console.log('inStatus=======', inStatus);
    // console.log('outStatus======', outStatus);
    // console.log('finalStatus======', finalStatus);
    egswap_orderInfo.status = finalStatus;
    orderInfo.order_status = finalStatus;

    if (finalStatus === 1) {
      orderInfo.first_tx_receivedTime = Math.floor(Date.now() / 1000);
    }
    // else if (finalStatus === 4) {
    //   orderInfo.order_status = 1;
    // } else if (finalStatus === 5) {
    //   orderInfo.order_status = 3;
    // } else if (finalStatus === 6) {
    //   orderInfo.order_status = 2;
    // }

    const orderData = await updateOrderOne(id, orderInfo);

    if (!orderData) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });
    }

    egswap_orderInfo.first_tx_receivedTime = orderData.first_tx_receivedTime;

    await registerCall(req.apiKey, { orderId: req.params.id }, orderData, `/api/v1/order/${req.params.id}`, 'GET');

    return res.status(200).json({
      code: 200,
      message: 'Success',
      data: egswap_orderInfo,
    });
  } catch (error) {
    console.log('error-----------', error);
    return res.status(500).json({
      code: 500,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

async function getByIdAdmin(req, res) {
  try {
    const { id } = req.params;

    const orderInfo = await getOrderOne({ _id: id });
    console.log('orderInfo*********************', orderInfo);
    if (!orderInfo) {
      return res.status(404).json({
        code: 404,
        message: 'The order was not found',
      });
    }

    const [fromNetworkData, toNetworkData] = await Promise.all([
      getNetworkOne({ _id: orderInfo.tokenA_network }),
      getNetworkOne({ _id: orderInfo.tokenB_network }),
    ]);

    const { exchange_flow, tokenA_xmr_orderID, xmr_tokenB_orderID } = orderInfo;

    const egswap_orderInfo = {
      orderId: orderInfo._id,
      from_symbol: orderInfo.tokenA_symbol,
      from_amount: orderInfo.tokenA_amount,
      from_network: {
        name: fromNetworkData?.name,
        protocol: fromNetworkData?.protocol,
      },
      to_symbol: orderInfo.tokenB_symbol,
      to_amount: orderInfo.tokenB_amount,
      to_address: orderInfo.tokenB_address,
      to_network: {
        name: toNetworkData?.name,
        protocol: toNetworkData?.protocol,
      },
      paying_address: orderInfo.paying_address,
      creation_time: orderInfo.creation_time,
      exchange_flow,
      tokenA_xmr_orderID,
      xmr_tokenB_orderID,
    };

    let finalStatus,
      cn_orderID,
      cn_orderInfo,
      ss_orderID,
      ss_orderInfo,
      se_orderID,
      se_orderInfo,
      ex_orderID,
      ex_orderInfo,
      ch_orderID,
      ch_orderInfo,
      inStatus,
      outStatus;

    switch (exchange_flow) {
      case 'cn_ss':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ss_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_cn':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, cn_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), cn_get_exchange_info(cn_orderID)]);
        // console.log('ss_orderInfo--------------------------------', ss_orderInfo)
        // console.log('cn_orderInfo--------------------------------', cn_orderInfo)
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'ss_se':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, se_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_ss':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ss_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'cn_se':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, se_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_cn':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, cn_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;

      case 'ex_cn':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, cn_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'cn_ex':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ex_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_se':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, se_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_ex':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ex_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_ss':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, ss_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_ex':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, ex_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;

      case 'cn_ch':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, ch_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_cn':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, cn_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'se_ch':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, ch_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_se':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, se_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'ss_ch':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, ch_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_ss':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, ss_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ex_ch':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, ch_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_ex':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, ex_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;

      case 'sp_cn':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, cn_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), cn_get_exchange_info(cn_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'cn_sp':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [cn_orderInfo, sp_orderInfo] = await Promise.all([cn_get_exchange_info(cn_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_se':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, se_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), se_get_exchange_info(se_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'se_sp':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [se_orderInfo, sp_orderInfo] = await Promise.all([se_get_exchange_info(se_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ss':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ss_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ss_get_exchange_info(ss_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'ss_sp':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ss_orderInfo, sp_orderInfo] = await Promise.all([ss_get_exchange_info(ss_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ex':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ex_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ex_get_exchange_info(ex_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ex_sp':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ex_orderInfo, sp_orderInfo] = await Promise.all([ex_get_exchange_info(ex_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      case 'sp_ch':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderID = orderInfo.xmr_tokenB_orderID;
        [sp_orderInfo, ch_orderInfo] = await Promise.all([sp_get_exchange_info(sp_orderID), ch_get_exchange_info(ch_orderID)]);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        outStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'ch_sp':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderID = orderInfo.xmr_tokenB_orderID;
        [ch_orderInfo, sp_orderInfo] = await Promise.all([ch_get_exchange_info(ch_orderID), sp_get_exchange_info(sp_orderID)]);
        inStatus = convert_status_symbol(ch_orderInfo);
        outStatus = convert_status_symbol(sp_orderInfo?.status);
        break;

      case 'cn':
        cn_orderID = orderInfo.tokenA_xmr_orderID;
        cn_orderInfo = await cn_get_exchange_info(cn_orderID);
        inStatus = convert_status_symbol(cn_orderInfo?.status);
        break;
      case 'ss':
        ss_orderID = orderInfo.tokenA_xmr_orderID;
        ss_orderInfo = await ss_get_exchange_info(ss_orderID);
        inStatus = convert_status_symbol(ss_orderInfo?.status);
        break;
      case 'se':
        se_orderID = orderInfo.tokenA_xmr_orderID;
        se_orderInfo = await se_get_exchange_info(se_orderID);
        inStatus = convert_status_symbol(se_orderInfo?.status);
        break;
      case 'ex':
        ex_orderID = orderInfo.tokenA_xmr_orderID;
        ex_orderInfo = await ex_get_exchange_info(ex_orderID);
        inStatus = convert_status_symbol(ex_orderInfo?.status);
        break;
      case 'ch':
        ch_orderID = orderInfo.tokenA_xmr_orderID;
        ch_orderInfo = await ch_get_exchange_info(ch_orderID);
        inStatus = convert_status_symbol(ch_orderInfo);
        break;
      case 'sp':
        sp_orderID = orderInfo.tokenA_xmr_orderID;
        sp_orderInfo = await sp_get_exchange_info(sp_orderID);
        inStatus = convert_status_symbol(sp_orderInfo?.status);
        break;
      default:
        break;
    }

    if (
      exchange_flow === 'cn' ||
      exchange_flow === 'ss' ||
      exchange_flow === 'se' ||
      exchange_flow === 'ex' ||
      exchange_flow === 'ch' ||
      exchange_flow === 'sp'
    ) {
      finalStatus = inStatus;
    } else finalStatus = convert_final_status(inStatus, outStatus);
    orderInfo.order_status = finalStatus;
    egswap_orderInfo.status = finalStatus;
    egswap_orderInfo.inStatus = inStatus;
    egswap_orderInfo.outStatus = outStatus;

    if (finalStatus === 1) {
      orderInfo.first_tx_receivedTime = Math.floor(Date.now() / 1000);
    } 
    // else if (finalStatus === 4) {
    //   orderInfo.order_status = 1;
    // } else if (finalStatus === 5) {
    //   orderInfo.order_status = 3;
    // } else if (finalStatus === 6) {
    //   orderInfo.order_status = 2;
    // }

    const orderData = await updateOrderOne(id, orderInfo);

    if (!orderData) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });
    }

    egswap_orderInfo.first_tx_receivedTime = orderData.first_tx_receivedTime;
    egswap_orderInfo.is_anon = orderData.is_anon;

    // console.log("================111=================", orderData);

    return res.status(200).json({
      code: 200,
      message: 'Success',
      data: egswap_orderInfo,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

module.exports = {
  create,
  getById,
  getByIdAdmin,
};
