const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  faqCreator: { type: Schema.Types.ObjectId, ref: 'User' },
  faqCreatorUsername: { type: String, required: true },
  faqCreatorName: { type: String, required: true },
});

module.exports = mongoose.model('FAQ', faqSchema );
