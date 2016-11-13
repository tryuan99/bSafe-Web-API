function findMatchingRequest(current, requestList) {
    const MAX_ORIGIN_DIST = 0.189394; // (in miles) ~1000ft
    const MAX_DESTINATION_DIST = 0.094697; // (in miles) ~500ft

    requestList = requestList.filter((function (request) {
        return distance(current.originLat, current.originLng, request.originLat, request.originLng) < MAX_ORIGIN_DIST && distance(current.destinationLat, current.destinationLng, request.destinationLat, request.destinationLng) < MAX_DESTINATION_DIST; // distance
    }));

    if (requestList.length == 0) {
        return null;
    }

    const x1 = current.destinationLat - current.originLat,
        y1 = current.destinationLng - current.originLng;
    var x2 = requestList[0].destinationLat - requestList[0].originLat,
        y2 = requestList[0].destinationLng - requestList[0].originLng;
    var bestMatch = requestList[0],
        lowestArea = crossProduct(x1, x2, y1, y2);
    for (var i = 1; i < requestList.length; i++) {
        x2 = requestList[i].destinationLat - requestList[i].originLat;
        y2 = requestList[i].destinationLng - requestList[i].originLng;
        var area = crossProduct(x1, x2, y1, y2);
        if (area < lowestArea) {
            bestMatch = requestList[i];
            lowestArea = area;
        }
    }

    return bestMatch;
}

function distance(latitude1, longitude1, latitude2, longitude2) {
    const EARTH_RADIUS = 3958.75; // (in miles)
    const sinDistLat = Math.sin(((latitude2 - latitude1) * Math.PI / 180) / 2);
    const sinDistLng = Math.sin(((longitude2 - longitude1) * Math.PI / 180) / 2);

    const a = Math.pow(sinDistLat, 2) + Math.pow(sinDistLng, 2) * Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180);
    const c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c; // (in miles)
}

function crossProduct(x1, x2, y1, y2) {
    return Math.abs(x1 * y2 - x2 * y1);
}

function findMeetupLocation(originLat1, originLng1, originLat2, originLng2) {
    var meetupLat = (originLat1 + originLat2) / 2;
    var meetupLng = (originLng1 + originLng2) / 2;
    return [meetupLat, meetupLng];
}

module.exports = {
    findMatchingRequest: findMatchingRequest,
    findMeetupLocation: findMeetupLocation
};