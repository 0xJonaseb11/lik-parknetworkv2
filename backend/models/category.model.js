/**
 * @module Category
 * @description Represents a Category model in the database.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Defines the Category Schema
 * 
 * @typedef {Object} Category
 * @property {string} name - The name of the category. (required)
 * @property {boolean} isDeleted - Whether the category is deleted. (default: false)
 * @property {Object} date - The creation and update date of the category.
 * @property {Date} date.createAt - The creation date of the category. (default: current date)
 * @property {Date} date.updateAt - The update date of the category. (default: current date)
 */
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
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
CategorySchema.pre("save", (next) => {
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
