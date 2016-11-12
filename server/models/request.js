var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
    /**
     * @property (Schema.Types.ObjectId) userId
     */
    userId: {type: Schema.Types.ObjectId, required: true},
    /**
     * @property (Date) time
     */
    time: {type: Date, default: Date.now},
    /**
     * @property {Schema.Types.ObjectId} matchId
     */
    matchId: {type: Schema.Types.ObjectId},
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
     * @property {Number} destinationLng
     */
    destinationLng: {type: Number}
});

module.exports = mongoose.model('Request', RequestSchema);