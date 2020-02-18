const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate-v2');

var MediaSchema = new Schema({
    name: { type: String, required: true },
    player: { type: String, enum: [ 'youtube' ], required: true },
    id_player: { type: String, required: true },
    duration: { type: Number, required: true },
    address: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    author_name: { type: String, required: true }
}, { collection: 'medias' });

MediaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Media', MediaSchema);
