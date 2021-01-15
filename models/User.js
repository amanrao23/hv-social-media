const mongoose= require('mongoose')
const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    friendList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
      }
    
})
module.exports= User= mongoose.model('user',UserModel)

