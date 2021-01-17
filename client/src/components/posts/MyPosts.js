import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMyPosts } from '../../actions/post';

import PostItem from './PostItem'
import PostForm from './PostForm';

const MyPosts = ({getMyPosts,post:{posts,loading}}) => {
    useEffect(()=>{
        getMyPosts()},[getMyPosts])
    
    return (
        <Fragment>
        <h1 className="large text-primary">My Posts</h1>
        
         <PostForm/>
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        </Fragment>
    )
}

MyPosts.propTypes = {
getMyPosts:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    post:state.post
})

export default connect(mapStateToProps,{getMyPosts})(MyPosts)
