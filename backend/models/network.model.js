/**
 * @module Network
 * @description Represents a Network model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the Network Schema
 * 
 * @typedef {Object} Network
 * @property {string} logo - The logo of the network. (required)
 * @property {string} name - The name of the network. (required)
 * @property {string} validation_address - The validation address value of the network.
 * @property {string} validation_extra - The validation extra value of the network.
 * @property {number} address_explorer - The address explorer of the network.
 * @property {boolean} tx_explorer - The transaction explorer of the network.
 * @property {boolean} isDeleted - Whether the network is deleted. (default: false)
 * @property {Object} date - The creation and update date of the network.
 * @property {Date} date.createAt - The creation date of the network. (default: current date)
 * @property {Date} date.updateAt - The update date of the network. (default: current date)
 */
const NetworkSchema = new Schema({
  logo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  validation_address: {
    type: String
  },
  validation_extra: {
    type: String
  },
  address_explorer: {
    type: String
  },
  tx_explorer: {
    type: String
  },
  protocol: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
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
  }
});

// Sets the createdAt parameter equal to the current time
NetworkSchema.pre("save", (next) => {
  next();
});

const Network = mongoose.model("Network", NetworkSchema);
module.exports = Network;
