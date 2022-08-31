const express = require('express')

const app = express()
const port = 3000

app.get('', (req, res) => {
    res.send('Hello express')
})
app.get('/help', (req, res) => {
    res.send('Hello express, this is help page')
})
app.get('/about', (req, res) => {
    res.send('<h1>Hello express, this is about page</h1>')
})
app.get('/show-weather', (req, res) => {
    res.send([
        {
            forecast: 'It is saving',
            location: 'Boston'
        }
    ])
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})