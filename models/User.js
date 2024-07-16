const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default: 'user'
    },
    enabled:{
        type:Boolean,
        default:true,
    },
    email:{
        type: String,
        require:true,
    },
},
{ timestamps:true }
)
module.exports = User = mongoose.model('users',UserSchema)