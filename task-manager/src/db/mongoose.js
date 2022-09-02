const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('database connected')
}).catch(err=>{
    console.log('database not connected',err)
})