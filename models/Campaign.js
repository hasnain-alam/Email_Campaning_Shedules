const mongoose = require('mongoose');

const RecipientLogSchema = new mongoose.Schema({
  email: String,
  status: String,
  error: String,
});

const CampaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [String],
  scheduledTime: Date,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  logs: [RecipientLogSchema],
});

module.exports = mongoose.model('Campaign', CampaignSchema);