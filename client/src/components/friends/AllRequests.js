import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequests } from '../../actions/user';
import DisplayAllRequests from './DisplayAllRequests'


const Allusers = ({auth,getRequests,user:{friendRequest}}) => {
    
    useEffect(()=>{
        getRequests()},[])
        
        
    if(friendRequest.length !==0 ){ 
        console.log(friendRequest)
       
    return (
    
    <Fragment>
    {    
        <div className="posts">
          {friendRequest.map((fRequest) => (
           <DisplayAllRequests key={fRequest._id} friend={fRequest}/>
          ))
          }
        </div>
                
    }
    
    </Fragment>

    )
    
}
    else{
        return null
}
    
}

Allusers.propTypes = {
getRequests:PropTypes.func.isRequired,
user:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    user:state.user,
    auth:state.auth
})

export default connect(mapStateToProps,{getRequests})(Allusers)
