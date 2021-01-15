const mongoose=require('mongoose')

const PostModel=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        }
    }],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
            ref:'user'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    date:{
        type:Date,
                default:Date.now()
    }
})



module.exports=Post=mongoose.model('post',PostModel)