const fs = require('fs')

// step one
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

//step two
user.name = 'Guther',
user.age = 53

//step three
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)

// Challenge: Work with JSON and the file system
// 1. load and parse the JSON data
// 2. Change the name and age property using your info
// 3. stringify the changed object and overwrite the original data
// 4. Test your work by viewing data in the JSON file