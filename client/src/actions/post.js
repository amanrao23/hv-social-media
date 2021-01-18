import { setAlert } from './alert';
import axios from 'axios'

import {
    GET_MY_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_FRIEND_POSTS,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types'

//Get posts from the current user
export const getMyPosts=()=>async dispatch=>{
    try{
        const res=await axios.get('/api/posts/myPosts')
        
        dispatch({
            type:GET_MY_POSTS,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//Get Posts from the friends of the user
export const getFriendPosts=()=>async dispatch=>{
    try{
        const res=await axios.get('/api/posts/friendsPost')
        
        dispatch({
            type:GET_FRIEND_POSTS,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

//GET A Single post
export const getPost= id =>async dispatch=>{
    try{
        const res=await axios.get(`/api/posts/post/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:POST_ERROR, 
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//ADD like to a post

export const addLike=postId=>async dispatch=>{
    try{
        const res=await axios.put(`/api/posts/like/${postId}`)
        
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes:res.data}
        })
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//Remove Like
export const removeLike=postId=>async dispatch=>{
    try{
        const res=await axios.put(`/api/posts/unlike/${postId}`)
        
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes:res.data}
        })
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//Delete Post
export const deletePost=postId=>async dispatch=>{
    try{
        await axios.delete(`/api/posts/${postId}`)
        
        dispatch({
            type:DELETE_POST,
            payload:{postId}
        })
        dispatch(setAlert('Post Removed','success'))
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

// Add Post
export const addPost=formData=>async dispatch=>{
    try{
        const res=await axios.post(`/api/posts`,formData)
        
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created','success'))
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

//ADD COMMENT

export const addComment=(postId,formData)=>async dispatch=>{
    try{
        const res=await axios.post(`/api/posts/comment/${postId}`,formData)
        
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert('Comment Added','success'))
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}




export const deleteComment=(postId,commentId)=>async dispatch=>{
    try{
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert('Comment Removed','success'))
    }
    catch (error) {
        dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}