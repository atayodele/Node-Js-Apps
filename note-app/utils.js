console.log('utils .js page')

const name = 'Mike Adenuga'

const add = (a, b) => {
    return a + b
}

const message = () => {
    return 'Your notes are on the table'
}

module.exports = { name, add, message }