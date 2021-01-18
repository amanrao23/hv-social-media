import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import DisplayPost from './DisplayPost';

const Post = ({ auth, getPost, post: { post, loading }, match }) => {
  let {id}=useParams()
 useEffect(()=> {
  getPost(id);
}, [getPost]);
  
    <Fragment>
    <div className="post bg-white p-1 my-1">
    <div>
      
        <img className="round-img" src={post.avatar} alt="" />
        <h4>{post.name}</h4>
      
    </div>
    </div>
    <div>
      <p className="my-1">{post.text}</p>
      <p className="post-date">Posted on {post.date}</p>
      </div>  
        
        </Fragment>
    
  
};

Post.propTypes = {
  
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth:state.auth
});

export default connect(mapStateToProps, { getPost })(Post);