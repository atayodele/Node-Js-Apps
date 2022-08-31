// CRUD create, read, update, delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
       return console.log('Unable to connect to database')
    }
    console.log('Connection successfully')
    const db = client.db(databaseName)
    //CREATE
    // db.collection('user').insertOne({
    //     name: 'Federal', age: 28
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert user to database')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('user').insertMany([
    //     {
    //         name: 'Jenny',
    //         age: 24
    //     },
    //     {
    //         name: 'Papa',
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('unable to insert documents')
    //     }
    //     console.log(result)
    //     console.log(result.ops)
    // })

    //READ
    db.collection('user').findOne({ _id: new ObjectID("62e091975ecab0ea073666a4") }, (error, user) => {
        if(error){
            return console.log('Unable to fetch user by id')
        }
        return console.log(user)
    })
    db.collection('user').find({ age: 30 }).toArray((error, users) => {
        if(error){
            return console.log('Unable to fetch user by id')
        }
        return console.log(users)
    })
    db.collection('user').find({ age: 28 }).count((error, count) => {
        if(error){
            return console.log('Unable to fetch user by id')
        }
        return console.log(count)
    })

    // db.collection('user').find({ completed: false }).toArray((error, tasks) => {
    //     if(error){
    //         return console.log('Unable to fetch task')
    //     }
    //     console.log(tasks)
    // })
    
    //UPDATE
    //updating documents using promises
    db.collection('user').updateOne({
        _id: new ObjectID('62e09433173346437b204091')
    }, {
        $set: {
            name: 'Lolade'
        }
        // $inc: { //to update age by increment
        //     age: 29
        // }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    //update many
    db.collection('user').updateMany({
        _id: new ObjectID('62e09433173346437b204091')
        // completed: false // Or using this condition to update
    }, {
        $set: {
            name: 'Lolade'
        },
        $inc: { //to update age by increment
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //DELETE
    
})