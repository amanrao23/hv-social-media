import { setAlert } from './alert';
import axios from 'axios'

import {
    GET_MY_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_FRIEND_POSTS
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


//ADD like to a post

export const addLike=postId=>async dispatch=>{
    try{
        const res=await axios.put(`/api/posts//like/${postId}`)
        
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
        const res=await axios.put(`/api/posts//unlike/${postId}`)
        
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