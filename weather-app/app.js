const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => { // destructuring
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

// const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=124a40f4a9acfebb93d485490a540dc5&query=37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//     // console.log(response)
//     // const data = JSON.parse(response.body) // no need to convert to json since we've sent json to true'
//     // console.log(response.body.current)
//     console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.feelslike + '% chance of rain');
// })
