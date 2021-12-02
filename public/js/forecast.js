const request = require('request')

const forecast = (address, callback) => {
    const forecasturl = "http://api.weatherstack.com/current?access_key=6cf1fdf67693e42d2495567ac0238d3f&query=" + address.long + "," + address.lat
    request({ url: forecasturl, json: true }, (error, data) => {
        if (error) {
            callback("Unable to Fetch detail, Please cheak your Network Connection", undefined)
        } else if (data.body.error) {
            callback("Unabe to find Location, Please Enter valid details", undefined)
        } else {
            callback(undefined, (data.body.current.weather_descriptions + ". It is currently " + data.body.current.temperature + " degrees out. It feels like " + data.body.current.feelslike + " degrees out."))
        }
    })
}
module.exports = forecast;
