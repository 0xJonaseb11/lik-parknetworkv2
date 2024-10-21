/**
 * @module Admin
 * @description Represents a Admin model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the Admin Schema
 *
 * @typedef {Object} Admin
 * @property {string} wallet_address - The admin wallet address.
 */
const AdminSchema = new Schema({
  wallet_address: {
    type: String,
  },
  sign_message: {
    type: String,
  },
});

// Sets the createdAt parameter equal to the current time
AdminSchema.pre("save", (next) => {
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
