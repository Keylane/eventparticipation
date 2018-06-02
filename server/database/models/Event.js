const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var eventSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Event name must be given"], unique: true, trim: true}
}, { collection: 'event', timestamps: { createdAt: 'creationDate', updatedAt: 'modificationDate' } });

module.exports = mongoose.model('Event', eventSchema);
