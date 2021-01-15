const express=require('express')
const {check, validationResult}=require("express-validator")
const router=express.Router();
const auth=require('../../middleware/auth');
const FriendRequest = require('../../models/FriendRequest');
const Post=require('../../models/Post')


//create a post
router.post('/',[auth,
    [
    check('text','text is required').not().isEmpty()
]
],
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    } 
        
    try {
        
    const user=await User.findById(req.user.id).select('-password')
    const newPost=new Post({
        text:req.body.text,
        name:user.name,
        photo:user.photo,
        user:req.user.id
    })
    const post= await newPost.save()
    res.json(newPost)
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    })


//DELETE POSTS

router.delete('/:id',auth,async(req,res)=>{
    
    try {
    const post=await Post.findById(req.params.id)
    
    if(!post){
        return res.status(404).json({msg:"Post not Found"})
    }
    
    if(post.user.toString()!==req.user.id){
        return res.status(401).json({msg:"User Not authorized"})
    }
    await post.remove()
    return res.status(200).json({msg:"Post Deleted"})
    }
    catch(err){
        console.log(err.message)
        
        if(err.kind=='ObjectId'){
            return res.status(404).json({msg:"Post Not Found"})
        }
        
        res.status(500).send('Server Error')
        
    }
    
})

// view all posts by self
router.get('/myPosts',auth, async(req,res)=>{
    
    try {
        const myPosts= await Post.find({user:req.user.id})
        console.log(myPosts)
        res.status(200).send(myPosts);

        
    } catch (error) {
        console.error(error.message)
    }
    })

// get posts by friends
router.get('/friendsPost',auth, async(req,res)=>{
    allPosts=[]
    try {
        const mySelf=await User.findById(req.user.id)
        const friends=mySelf.friendList
        friends.forEach(async friend=>{
            const Posts= await Post.find({user:friend})
            allPosts.push(Posts)
        })
        console.log(allPosts)
        res.status(200).send(allPosts)
        // const myPosts= await Post.find({user:req.user.id})
        // console.log(myPosts)
        // res.status(200).send(myPosts);
        
    } catch (error) {
        console.error(error.message)
    }
    })


// like a post
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        
        if(!post){
            return res.status(404).json({msg:"Post not Found"})
        }
        
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length>0){
            return res.status(400).json({"msg":"Post already liked"})
        }
        post.likes.unshift({user:req.user.id})
        await post.save();
        
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

//unlike a post
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        
        if(!post){
            return res.status(404).json({msg:"Post not Found"})
        }
        
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length===0){
            return res.status(400).json({"msg":"Post has not been liked"})
        }
        
        const removeIndex=post.likes.map(like=>like.user,toString()).indexOf(req.user.id)
        
        post.likes.splice(removeIndex,1)
        await post.save();
        
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// comment on a post
router.post('/comment/:id',[auth,
    [
    check('text','text is required').not().isEmpty()
]
],
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    } 
        
    try {
        
    const user=await User.findById(req.user.id).select('-password')
    const post=await Post.findById(req.params.id)
    
    const newComment=new Post({
        text:req.body.text,
        name:user.name,
        photo:user.photo,
        user:req.user.id
    })
    post.comments.unshift(newComment)
    
    await post.save()
    res.json(post.comments)
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    })


//delete a comment
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{

try {
const post=await Post.findById(req.params.id)

const comment=post.comments.find(comment=> comment.id===req.params.comment_id)

if(!comment){
    return res.status(404).json({msg:"No such comment found"})
}
if(comment.user.toString()!==req.user.id){
    return res.status(401).json({msg:"User not authorized"})
}

const removeIndex=post.comments.map(like=>like.user,toString()).indexOf(req.user.id)
        
post.comments.splice(removeIndex,1)
await post.save();
        
return res.status(200).json({msg:"Comment Deleted"})
}
catch(err){
    console.log(err.message)
    
    if(err.kind=='ObjectId'){
        return res.status(404).json({msg:"Post Not Found"})
    }
    
    res.status(500).send('Server Error')
    
}

})


module.exports=router