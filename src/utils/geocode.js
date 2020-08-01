const request = require('request');

const geocode = (address, callback) => {
    const url = ('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicXNoZXJpZGEiLCJhIjoiY2tiOGJ2ZTF6MDJxeTJ5czBnaXExd2psbyJ9.MTBt4MBAkMfKHEvXIGBNqg&limit=1')
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            if(!body.features) { //place not found
                callback('No results found for location.  Check that the location given is a valid place.', undefined);
            //             console.log(`Unable to complete request. ${request.body.message}`))
            } else if(body.features.length === 0) {
                callback('Unable to geocode location.', undefined);
            } else{
                // console.log(response.body.features[0].center)
                data = {
                    'placeName': body.features[0].place_name,
                    'lon': body.features[0].center[0],
                    'lat': body.features[0].center[1]
                }
                callback(error, data);
            }
        }
    })
};

module.exports = {
    'geocode': geocode
}