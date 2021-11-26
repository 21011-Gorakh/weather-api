const request = require('request')

const forecast = (address, callback) => {
    const forecasturl = "http://api.weatherstack.com/current?access_key=001c0f5d5712cbd5c1bdd65ca93afcce&query=" + address.long + "," + address.lat
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