import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/user';
import UserItem from './UserItem'

const GetUsers = ({getUsers,user:{users,sentRequest}}) => {
    useEffect(()=>{
        getUsers()},[])
    
    return (
        <Fragment>
        
        <h1 className="large text-primary">All Users</h1>
        
        <div className="posts">
          {users.map((user) => (
            <UserItem key={user._id} users={user} />
          ))}
        </div>
        </Fragment>
    )
}

GetUsers.propTypes = {
getUsers:PropTypes.func.isRequired,
user:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    user:state.user
})

export default connect(mapStateToProps,{getUsers})(GetUsers)
