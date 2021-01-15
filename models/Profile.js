const mongoose= require('mongoose')

const ProfileModel=new mongoose.Schema({
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user' 
    },
    bio:{
        type:String
    }
})
module.exports= Profile = mongoose.model('profile',ProfileModel)
