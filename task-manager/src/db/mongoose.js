const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { // both connectionString and db name
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
}) 

