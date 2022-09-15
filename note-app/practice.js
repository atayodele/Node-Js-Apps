let fs = require('fs')
let events = require('events')

let language = "Javascript"
console.log(language)
for(var i = 0; i < 10; i++){
    console.log(i)
}

//callbacks
fs.readFile('notes.txt', (err, data) => {
    if(err) return console.log(err);
    console.log(data.toString())
})
//EVENT LOOP
//creating an event emitter
let eventEmitter = new events.EventEmitter();
//this is the event listener
eventEmitter.on('connection', () =>{
    console.log('Connection successful')
})
//firing the event
eventEmitter.emit('connection') 