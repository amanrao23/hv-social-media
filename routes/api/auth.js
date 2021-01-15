const express=require('express')
const router=express.Router();
const auth = require('../../middleware/auth')
const User=require('../../models/User')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const { check, validationResult } = require('express-validator')



router.get('/',auth,
async(req,res)=>{
    
    try {
        const user= await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

    });

    
 //login    
router.post('/', 
[
    check('email', 'Valid email is required').isEmail(), check('password', 'Password required').exists()
], 
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password}=req.body
     
    //check if no user exists
    try {
        let user =await User.findOne({email})
        if(!user){

            res.status(400).json({errors:[{msgs:"No such user exists"}]})

        }
    // const matched =await bcrypt.compare(password,user.password)

    
    if(password!=user.password){

        res.status(400).json({errors:[{msgs:"Invalid Password"}]})
        
    }
    const payload={
        user:{
            id:user.id
        }
    }
    
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:3600},
        (err,token)=>{
            if(err) throw err
            res.json({token})
        }
    )

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
    
    
    
})


module.exports=router 