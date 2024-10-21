const mongoose = require('mongoose');
const ApiKeyLog = require('./apiKeyLog.model');
const { Schema } = mongoose;

const ApiKeySchema = new Schema({
  key: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
  },
  expiredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

ApiKeySchema.pre('save', (next) => {
  const currentDate = new Date();

  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

const ApiKey = mongoose.model('ApiKey', ApiKeySchema);
module.exports = ApiKey;
