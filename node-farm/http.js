// SERVER
const { read } = require('fs');
const http = require('http') 
const server = http.createServer((req, res) => {
    const path = req.url;
    if(path === '/' || path === '/overview'){
        res.end('This is the overview page')
    }else if(path === '/product'){
        res.end('This is the Product page')
    }else{
        res.writeHead(404, 'Page not found')
        res.end('Page not found')
    }
    res.end('Hello from the server!')
})
server.listen(3000, "localhost", () => {
    console.log('Listening to requests on port 3000')
})