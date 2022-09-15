const http = require('http')
const data = [
    {
        id: 1,
        name: "John"
    },
    {
        id: 2,
        name: "Luke"
    },
    {
        id: 3,
        name: "Mark"
    },
    {
        id: 4,
        name: "Mattew"
    }
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Language', 'en-US')
    res.setHeader('Date', new Date(Date.now()))
    res.end(JSON.stringify(
        { 
            success: true,
            message: 'Data is sent',
            data: data
        }
    ))
})

server.listen(3000, () => {
    console.log("Server has started")
})