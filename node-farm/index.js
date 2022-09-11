// SERVER
const fs = require('fs');
const http = require('http') 
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
  );
  const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
  );
  
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
  const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const path = req.url;
    if(path === '/' || path === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
      
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
        // res.end('This is the overview page')
    }else if(path === '/product'){
        res.end('This is the Product page')
    }else if(path === '/api'){
        fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const dataObj = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(data)
            // console.log(dataObj)
        });
    }else{
        res.writeHead(404, 'Page not found')
        res.end('Page not found')
    }
    res.end('Hello from the server!')
})
server.listen(3000, "localhost", () => {
    console.log('Listening to requests on port 3000')
})