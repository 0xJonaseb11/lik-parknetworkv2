/**
 * @module Order
 * @description Represents a Order model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the Order Schema
 *
 * @typedef {Object} Order
 * @property {string} tokenA_symbol - The token A symbol of the order.
 * @property {string} tokenA_amount - The token A amount of the order.
 * @property {mongoose.Schema.Types.ObjectId} tokenA_network - The network ID associated with the token of the order.
 * @property {string} tokenB_symbol - The token B symbol of the order.
 * @property {string} tokenB_amount - The token B amount of the order.
 * @property {string} tokenB_address - The receiver address of the order.
 * @property {mongoose.Schema.Types.ObjectId} tokenB_network - The network ID associated with the token of the order.
 * @property {boolean} paying_address - The paying address of the order.
 * @property {string} exchange_flow - The exchange flow of the order.
 * @property {string} tokenA_xmr_orderID - The order ID from token A to xmr of the order.
 * @property {string} deposit_tx_hash - The transaction hash from token A to xmr of the order.
 * @property {string} xmr_tokenB_orderID - The order ID from xmr to token B of the order.
 * @property {string} receive_tx_hash - The transaction hash from xmr to token B of the order.
 * @property {string} first_tx_receivedTime - The time that was received the deposit of the order.
 * @property {string} order_status - The status of the order.
 * @property {string} creation_time - The time that was created the order.
 * @property {boolean} isDeleted - Whether the order is deleted. (default: false)
 * @property {Object} date - The creation and update date of the order.
 * @property {Date} date.createAt - The creation date of the order. (default: current date)
 * @property {Date} date.updateAt - The update date of the order. (default: current date)
 */
const OrderSchema = new Schema({
  tokenA_symbol: {
    type: String,
  },
  tokenA_amount: {
    type: String,
  },
  tokenA_network: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network",
  },
  tokenB_symbol: {
    type: String,
  },
  tokenB_amount: {
    type: String,
  },
  tokenB_address: {
    type: String,
  },
  tokenB_network: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network",
  },
  paying_address: {
    type: String,
  },
  exchange_flow: {
    type: String, // cn_ss, ss_cn, se_ss, ss_se, cn_se, se_cn
  },
  tokenA_xmr_orderID: {
    type: String,
  },
  deposit_tx_hash: {
    type: String,
  },
  xmr_tokenB_orderID: {
    type: String,
  },
  receive_tx_hash: {
    type: String,
  },
  first_tx_receivedTime: {
    type: Number,
    default: 0,
  },
  order_status: {
    type: Number,
    default: 0, // 0: pending, 1: success, 2: failed 3: expired
  },
  creation_time: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  is_anon: {
    type: Boolean,
    default: true,
  },
  source: {
    type: String,
  },
  domain: {
    type: String,
  },
  chatId: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  date: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

// Sets the createdAt parameter equal to the current time
OrderSchema.pre("save", (next) => {
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
