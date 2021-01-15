const express=require('express')
const router=express.Router();
// const {check,validationResult}=require('express-validator')
const auth= require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User=require('../../models/User')


//create/update user profile
router.post('/',auth,
async(req,res)=>{
    profileField = {}
    const {bio}=req.body
    profileField.user=req.user.id
    profileField.bio=bio
    try {
        
        let profile=await Profile.findOne({user:req.user.id})
        
        if(profile){
            //Update
            profile= await Profile.findOneAndUpdate({user:req.user.id},
            {$set:profileField},
            {new:true})
            return res.json(profile)
        }
        
        
        //Create Profile
        profile=new Profile(profileField)
        await profile.save()
        res.json(profile)
        
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
          
})

//get current user profile

router.get('/',auth,async(req,res)=>{
    try {
        const profile= await Profile.findOne({user:req.user.id}).populate('user',['name','email'])
        console.log(profile)
        if(!profile){
            return res.status(400).json({msg:"No Profile exists"})
        }
        
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    
});

// Get a user profile by user id

router.get('/user/:user_id',auth,async(req,res)=>{
    try {
        const profile= await Profile.findOne({user:req.params.user_id})
        
        if(!profile){
            return res.status(400).json({msg:"No such Profile exists"})
        }
        
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        
        if(error.kind=='ObjectId')
        return res.status(400).json({msg:"No such Profile Exists"})
        
        return res.status(500).send('Server Error')
    }
    
    res.send('Profile Route')


});

// Delete a profile

router.delete('/',auth, async(req,res)=>{
    
    try {
        await Profile.findOneAndRemove({user:req.user.id})
    
        await User.findOneAndRemove({_id:req.user.id})
        
        res.json({msg:"User Deleted"}) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
    
})




module.exports=router