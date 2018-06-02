const mongoose = require('mongoose');
const path = require("path");
mongoose.Promise = global.Promise;
var statusEnum = require(path.join(__dirname + '../../../logics/enums')).participationStatus;

var participantSchema = new mongoose.Schema({
  event: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
    ref: 'Event'
	},
  participants: [
    {
      _id: false,
      name: {type: String, required: [true, "Name of participant must be given"], trim: true},
      status: {type: String, required: true, default: statusEnum.Unknown, enum: [statusEnum.Unknown, statusEnum.Accepted, statusEnum.Tentative, statusEnum.Declined, statusEnum.NoAnswer] }
    }
  ]
}, { collection: 'participant' });

module.exports = mongoose.model('Participant', participantSchema);
