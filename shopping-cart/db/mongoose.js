const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/shopping-cart',{
    
}).then(()=>{
    console.log('database connected')
}).catch(err=>{
    console.log('database not connected',err)
})