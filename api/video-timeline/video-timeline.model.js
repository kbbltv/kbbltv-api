const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoTimelineSchema = new Schema({
    media: { type: Schema.Types.ObjectId, ref: 'Media' },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true }
}, { collection: 'videoTimeline' });

module.exports = mongoose.model('videoTimeline', VideoTimelineSchema);
