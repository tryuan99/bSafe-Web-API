var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
    /**
     * @property (String) name
     */
    userId: {type: Schema.Types.ObjectId, required: true},
    /**
     * @property (Date) time
     */
    time: {type: Date, default: Date.now},
    /**
     * @property {Number} originLat
     */
    originLat: {type: Number},
    /**
     * @property {Number} originLng
     */
    originLng: {type: Number},
    /**
     * @property {Number} destinationLat
     */
    destinationLat: {type: Number},
    /**
     * @property {Number} destination Lng
     */
    destinationLng: {type: Number}
});

module.exports = mongoose.model('Request', RequestSchema);