const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken');
const User=require('../../models/User')
const FriendRequest=require('../../models/FriendRequest')
const config = require('config');
const auth=require('../../middleware/auth')

//get all users except current one
router.get('/getUsers',auth, async (req, res) => {
  const requests = await User.find({ "_id": { "$ne": req.user.id }}).select('name _id')
  res.json(requests);
});

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
// GET ALL FRIENDS OF A USER
router.get('/getfriends',auth, async (req, res) => {
try {
  const mySelf=await User.findById(req.user.id)
  friends=await mySelf.friendList
  let allFriends=[]
        for(let i=0;i<friends.length;i++){
            const friend= await User.findById(friends[i]).select('_id name')
            allFriends.unshift(friend) 
        }
         
  res.json(allFriends)
  
} catch (error) {
  console.log(error.message)
        res.status(500).send("Server Error")
}
});


//Get all potential friends
router.get('/getPotentialFriends',auth,async(req, res) => {
  try 
  {
    const potentialCandidates = await User.find({ "_id": { "$ne": req.user.id }}).select('_id')
    
    const recieverToNeglect= await FriendRequest.find({sender:req.user.id}).select('reciever')

    const senderToNeglect= await FriendRequest.find({reciever:req.user.id}).select('sender')
     
    
    const mySelf=await User.findById(req.user.id)
    friends=await mySelf.friendList
    
    let candidates=new Set()

    for(let i=0;i<potentialCandidates.length;i++)
    {
      candidates.add(JSON.stringify(potentialCandidates[i]._id))
    }
    
    for(let i=0;i<recieverToNeglect.length;i++){
      
      if(candidates.has(JSON.stringify(recieverToNeglect[i]._id))){
        candidates.delete(JSON.stringify(recieverToNeglect[i]._id))
      }}
      for(let i=0;i<senderToNeglect.length;i++){
      
        if(candidates.has(JSON.stringify(senderToNeglect[i]._id))){
          candidates.delete(JSON.stringify(senderToNeglect[i]._id))
        }}

      for(let i=0;i<friends.length;i++){
      if(candidates.has(JSON.stringify(friends[i]))){
        candidates.delete(JSON.stringify(friends[i]))
      }
    }
    
    finalCandidates=[]
    for (let candidate of candidates){
      const user= await User.findById(JSON.parse(candidate)).select('_id name')
      finalCandidates.unshift(user)
    }
    res.json(finalCandidates)
    
  } 
  catch (error) {
    console.log(error.message)
          res.status(500).send("Server Error")
  }
  });

//get all friend requests of a user
router.get('/getfriendrequests',auth, async (req, res) => {
    const requests = await FriendRequest.find({
      recipient: req.user.id
    });
    res.status(200).send(requests);
  });
  
  //get requests sent by a user
router.get('/getsentrequests',auth, async (req, res) => {
  const requests = await FriendRequest.find({
    sender: req.user.id
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

router.post('/sendRequest/:id',auth, async (req,res)=>{
    try {
        const other_user=await User.findById(req.params.id)
        console.log(other_user)
        if(!other_user){
            return res.status(404).json({msg:"No such user found"})
        }
        const requests = await FriendRequest.findOne({
            recipient: req.params.id,
            sender: req.user.id
          })
        if(requests){
              return res.status(400).json({msgs:"Friend Request already sent"})
          }
        
        const newRequest=new FriendRequest({
            sender:req.user.id,
            recipient:req.params.id
        })
        await newRequest.save()
        return res.status(200).send("Friend Request Sent")
        }
        catch(err){
            console.log(err.message)
            res.status(500).send("Server Error")
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