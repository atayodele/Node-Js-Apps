const fs = require('fs')
// write a string in a file
fs.writeFileSync('notes.txt', 'My name is Timilehin')
// Append a message in a file
fs.appendFileSync('notes.txt', ' \nI live in Nigeria')

//Challenge: Append a message to note.txt
// 1. Use appendFileSync to append to the file
// 2. Run the script
// 3. Check your work by opening the file and viewing the appended text
