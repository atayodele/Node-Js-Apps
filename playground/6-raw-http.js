const https = require('http')
// const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/40,-75'
const url = 'http://api.weatherstack.com/current?access_key=124a40f4a9acfebb93d485490a540dc5&query=45,-75&units=f'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()