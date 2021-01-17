import axios from 'axios'
import {setAlert} from './alert'

import {
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    ERROR_REQUEST,
    GET_USERS,
    GET_FRIEND_POSTS,
    GET_SENT_REQUEST,
    GET_FRIENDS,
    GET_POTENTIAL_FRIENDS
} from './types'


export const getFriends=()=>async dispatch=>{
    try{
        const res=await axios.get(`/api/users/getfriends`)
        dispatch({
            type:GET_FRIENDS,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:ERROR_REQUEST,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



export const getPotentialFriends=()=>async dispatch=>{
    try{
        const res=await axios.get(`/api/users/getPotentialFriends`)
        dispatch({
            type:GET_POTENTIAL_FRIENDS,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:ERROR_REQUEST,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



export const getUsers=()=>async dispatch=>{
    try{
        const res=await axios.get(`/api/users/getUsers`)
        dispatch({
            type:GET_USERS,
            payload:res.data
        })
    }
    catch (error) {
        dispatch({
        type:ERROR_REQUEST,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const sendRequest= userId=>async dispatch=>{
    try{
        const res=await axios.post(`/api/users/sendRequest/${userId}`)
        dispatch({
            type:SEND_FRIEND_REQUEST,
            payload:{userId}
        })
        dispatch(setAlert('Request Sent','success'))
    }
    
    catch (error) {
        dispatch({
        type:ERROR_REQUEST,
        payload:{msg:error.response}
        })
    }
}

export const getSentRequests= userId=>async dispatch=>{
    try{
        await axios.get(`/api/users/getsentrequests`,)
        dispatch({
            type:GET_SENT_REQUEST,
            payload:{userId}
        })
    }
    catch (error) {
        dispatch({
        type:ERROR_REQUEST,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


