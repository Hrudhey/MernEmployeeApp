const mongoose= require('mongoose');    // use mongoose to connect to database
const userSchema= mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
    
})
const userData= mongoose.model('user',userSchema);   //collection name without s
module.exports= userData;