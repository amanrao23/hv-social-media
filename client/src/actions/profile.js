import axios from 'axios'
import {setAlert} from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// get current user profile
export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/profile')
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


// create profile
export const createProfile=(formData,history)=>async dispatch=>{
    try {
        const res = await axios.post('/api/profile', formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    
    history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}