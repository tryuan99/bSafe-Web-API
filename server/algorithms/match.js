function findMatchingRequest(request, requestList) {
    /**
     * Distance estimate:
     * Latitude: 111,111 meters = 1 deg latitude
     * Longitude: 111,111 meters * cos (latitude) = 1 deg longitude
     *
     * Target distance < 200 feet
     */
    const latThreshold = 0;
}

module.exports = {
    findMatchingRequest: findMatchingRequest
};