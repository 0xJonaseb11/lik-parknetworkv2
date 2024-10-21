/**
 * @module Token
 * @description Represents a Token model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the Token Schema
 * 
 * @typedef {Object} Token
 * @property {string} logo - The logo of the token. (required)
 * @property {string} name - The name of the token. (required)
 * @property {string} color - The color of the token. (required)
 * @property {string} keyword - The keyword of the token.
 * @property {string} displayName - The display name of the token. (required)
 * @property {mongoose.Schema.Types.ObjectId} categoryId - The category ID associated with the token.
 * @property {mongoose.Schema.Types.ObjectId} networkId - The network ID associated with the token.
 * @property {boolean} isDeleted - Whether the token is deleted. (default: false)
 * @property {Object} date - The creation and update date of the token.
 * @property {Date} date.createAt - The creation date of the token. (default: current date)
 * @property {Date} date.updateAt - The update date of the token. (default: current date)
 */
const TokenSchema = new Schema({
  logo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  keyword: {
    type: String
  },
  displayName: {
    type: String,
    required: true
  },
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  networkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network"
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
TokenSchema.pre("save", (next) => {
  next();
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
