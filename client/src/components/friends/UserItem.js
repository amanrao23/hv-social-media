import React,{Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect } from 'react-redux'
import {sendRequest,getSentRequests} from '../../actions/user'
const UserItem = ({getSentRequests,sendRequest,auth,sentRequests,users: { _id,name,photo }}) => {
    useEffect(()=>{
        getSentRequests()},[sendRequest])  
    return(
    <Fragment>
    <div className="profile bg-light">
    <img src={photo} alt="" className="rounf-img"/>
    <h2>{name}</h2>
    </div>
    
    <button className="btn btn-primary" onClick={() => sendRequest(_id)}>Send Request</button>

    </Fragment>)
  
    }
  
UserItem.propTypes = {
user:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
sendRequest:PropTypes.func.isRequired,
getSentRequests:PropTypes.func.isRequired,
}
const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,{sendRequest,getSentRequests})(UserItem)
