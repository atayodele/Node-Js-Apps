const fs = require('fs') //fs means file system

const hello = 'Hello World'
console.log(hello)

// BLOCKING => SYNCRONOUS WAY
const textIn = fs.readFileSync('./txt/input.txt/', "utf-8")
console.log(textIn)
const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.txt/', textOut)
console.log('File written!')

//UN-BLOCKING => Asynchronous way
fs.readFileSync('./txt/input.txt/', 'utf-8', (err, data) => {
    
})
