const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { // both connectionString and db name
//     userNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify:false,
//     useUnifiedTopology: true 
// }) 

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useUnifiedTopology: true 
}).then(()=>{
    console.log('database connected')
}).catch(err=>{
    console.log('database not connected',err)
})