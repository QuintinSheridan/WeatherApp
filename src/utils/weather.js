const request = require('request');

const getWeather = (lat, lon, callback) => {
    let url = ('http://api.weatherstack.com/current?access_key=e5f227eadd622619802a70faaddda4a7&query=' + `${lat},${lon}`)
    // console.log('weatherURL: ', url)
    request({url, json: true}, (error, { body }) =>{
        if(error) {
            callback('Unable to connect to weatherstack API', undefined)
        } else {
            if(body.success===false) {
                callback(`Weather API request did not succeed with response code 
                    ${body.error.code}: ${body.error.info}`,
                    undefined)
            } else{
                // console.log(response.body.current);
                data = {
                    'location': body.location.region + ', ' + body.location.country,
                    'temperature': body.current.temperature,
                    'precipitation': body.current.precip
                }

                console.log('Weather Response', body)

                callback(error, data)
            }
        }
    })
}

module.exports = {
    'getWeather': getWeather
}