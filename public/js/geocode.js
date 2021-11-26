const request = require('request')

const geocode = (address, callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ29yYWtoMTIzIiwiYSI6ImNrdWdiYmZ2azFsZ3IzMm10eDV0cDExbHcifQ.DSKMvpAI07zvKxoId2xsJA"
    request({ url: geocodeurl, json: true }, (error, data) => {
        if (error) {
            callback("Unable to Fetch detail, Please cheak your Network Connection", undefined)
        } else if (data.body.features.length === 0) {
            callback("Unabe to find Location, Please Enter valid details", undefined)
        } else {
            callback(undefined, {
                Latitude: data.body.features[0].center[0],
                Longitude: data.body.features[0].center[1],
                location: data.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;