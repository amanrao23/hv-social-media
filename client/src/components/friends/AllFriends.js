import React, { Fragment,useEffect,useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFriends } from '../../actions/user';
import DisplayFriends from './DisplayFriends'


const AllFriends = ({auth,getFriends,user:{friends}}) => {
    
    useEffect(()=>{
        getFriends()},[getFriends])

    return (
    
    <Fragment>
    {    
        <div className="posts">
          {friends.map((friend) => (
           <DisplayFriends key={friend._id} friend={friend}/>
          ))
          }
        </div>
                
    }
    </Fragment>
    )
    
}

AllFriends.propTypes = {
getFriends:PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    user:state.user,
    auth:state.auth
})

export default connect(mapStateToProps,{getFriends})(AllFriends)
