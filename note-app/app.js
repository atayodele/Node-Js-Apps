const chalk = require('chalk')
const validator = require('validator')
const yargs = require('yargs')

const result = require('./utils.js')

console.log(result.name)
console.log(result.add(4,3))
console.log(result.message())
console.log(validator.isEmail('foo@bar.com')); //=> true
console.log(validator.isURL('https://www.npmjs.com'))
console.log(chalk.green('success!'))