const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AudioTimelineSchema = new Schema({
    media: { type: Schema.Types.ObjectId, ref: 'Media' },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true }
}, { collection: 'audioTimeline' });

module.exports = mongoose.model('AudioTimeline', AudioTimelineSchema);
