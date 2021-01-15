const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken');
const User=require('../../models/User')
const FriendRequest=require('../../models/FriendRequest')
const config = require('config');
const auth=require('../../middleware/auth')



// register a user
router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(), check('email', 'Valid email is required').isEmail(), check('password', 'Minimum 5 character long').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {name, email, password}=req.body
    //check if user already exists
    try {
        let user =await User.findOne({email})
             console.log(req.body)

        if(user){
            res.status(400).json({errors:[{msgs:"User already exists"}]})
        }
        
        user =new User({
            name,
            email,
            password
        })
        // const salt= await bcrypt.genSalt(10)
        
        // user.password=await bcrypt.hash(password,salt)
        
        await user.save()
        const payload = {
            user: {
              id: user.id 
            }
          };
    
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


//get all friend requests of a user
router.get('/getfriendrequests',auth, async (req, res) => {
    const requests = await FriendRequest.find({
      recipient: req.user.id
    });
    res.status(200).send(requests);
  });
  
  

//check if user has already sent a friend request to other user
router.get('/checkrequest/:id',auth, async (req, res) => {
    const requests = await FriendRequest.findOne({
      recipient: req.params.id,
      sender: req.user.id
    });
    if(requests){
        res.status(400).json({errors:[{msgs:"Friend Request already sent"}]})
    }
    res.status(200).send(requests);
  });
  


// send a friend request

router.post('/sendRequest',auth, async (req,res)=>{
    try {
        
        console.log(typeof req.body.id)
        const other_user=await User.findById(req.body.id)
        console.log(other_user)
        if(!other_user){
            return res.status(404).json({msg:"No such user found"})
        }
        const requests = await FriendRequest.findOne({
            recipient: req.body.id,
            sender: req.user.id
          })
        if(requests){
              res.status(400).json({errors:[{msgs:"Friend Request already sent"}]})
          }
        
        const newRequest=new FriendRequest({
            sender:req.user.id,
            recipient:req.body.id
        })
        await newRequest.save()
        res.json(newRequest)
        
        }
        catch(err){
            console.log(err.message)
                       
        }
        
           
} )


// accept a friend request

router.post('/acceptRequest',auth,async (req,res)=>{
    
    try {
    const selfUser=await User.findById(req.user.id)
    const sender=await User.findById(req.body.id)
    const requests = await FriendRequest.findOne({
        sender: req.body.id,
        recipient: req.user.id
      })
    console.log(requests)
    console.log(sender)
    if(!sender){
        return res.status(404).json({msg:"No such user found"})
    }
    
    selfUser.friendList.push(req.body.id)
    sender.friendList.push(req.user.id)
    requests.status="accepted"
    selfUser.save()
    sender.save()
    requests.save()
    res.status(200).json({msg:"Friend Request Accepted"})
    } catch (error) {
        console.error(error.message)
    }
    
        
        
})


// reject a friend request

router.post('/acceptRequest',auth,async (req,res)=>{
    
    try {
    const requests = await FriendRequest.findOne({
        sender: req.body.id,
        recipient: req.user.id
      })

    requests.status="rejected"

    requests.save()
    res.status(200).json({msg:"Friend Request Rejected"})
    } catch (error) {
        console.error(error.message)
    }
     
})

// unfriend a person
router.post('/unfriend',auth,async (req,res)=>{
    
    try {
    const requests = await FriendRequest.findOne({
        sender: req.body.id,
        recipient: req.user.id
      })

    requests.status="rejected"

    requests.save()
    res.status(200).json({msg:"Friend Request Rejected"})
    } catch (error) {
        console.error(error.message)
    }
     
})


module.exports = router