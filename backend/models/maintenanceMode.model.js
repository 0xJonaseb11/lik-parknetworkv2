/**
 * @module MaintenanceMode
 * @description Represents a MaintenanceMode model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the MaintenanceMode Schema
 *
 * @typedef {Object} MaintenanceMode
 * @property {string} wallet_address - The admin wallet address.
 */
const maintenanceModeSchema = new Schema({
  maintenance_status: {
    type: Boolean,
  },
});

// Sets the createdAt parameter equal to the current time
maintenanceModeSchema.pre("save", (next) => {
  next();
});

const MaintenanceMode = mongoose.model(
  "MaintenanceMode",
  maintenanceModeSchema
);
module.exports = MaintenanceMode;
