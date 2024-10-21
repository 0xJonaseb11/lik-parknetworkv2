/**
 * @module WarningStatus
 * @description Represents a Admin model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the WarningStatus Schema
 *
 * @typedef {Object} WarningStatus
 * @property {string} wallet_address - The admin wallet address.
 */
const WarningStatusSchema = new Schema({
  warning_status: {
    type: Boolean,
  },
  message: {
    type: String,
  },
});

// Sets the createdAt parameter equal to the current time
WarningStatusSchema.pre("save", (next) => {
  next();
});

const WarningStatus = mongoose.model("WarningStatus", WarningStatusSchema);
module.exports = WarningStatus;
