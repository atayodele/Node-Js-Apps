const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body>')
        res.write('<p>Welcome to my page</p>')
        res.write('<form action="create-user" method="POST"><input type="text" name="username"><button type="submit">Send</buttton></form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/create-user'){
        const body = [];
        req.on('data', chuck => {
            body.push(chuck)
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const messages = parsedBody.split('=')[1]
            console.log(messages); //username=whatever-the-user-entered
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }
})

server.listen(3000)