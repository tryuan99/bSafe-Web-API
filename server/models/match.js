var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
    /**
     * @property {[Schema.Types.ObjectId]} requestIds
     */
    requestIds: {type: [Schema.Types.ObjectId], required: true},
    /**
     * @property {Number} meetupLat
     */
    meetupLat: {type: Number},
    /**
     * @property {Number} meetupLng
     */
    meetupLng: {type: Number}
});

module.exports = mongoose.model('Match', MatchSchema);