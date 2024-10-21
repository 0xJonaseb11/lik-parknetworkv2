const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApiKeyLogSchema = new Schema({
  apiKey: { type: Schema.Types.ObjectId, ref: 'ApiKey' },
  payload: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed,
  action: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ApiKeyLogSchema.pre('save', (next) => {
  const currentDate = new Date();

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

const ApiKeyLog = mongoose.model('ApiKeyLog', ApiKeyLogSchema);
module.exports = ApiKeyLog;
