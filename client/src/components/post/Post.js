import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import DisplayPost from './DisplayPost';

const Post = ({ getPost, post: { post, loading }, match }) => {
    let {id}=useParams()
  useEffect(() => {
    getPost(id);
  }, []);

  return ( 
    <Fragment>
    <DisplayPost post={post} />
    
    </Fragment>
  )
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);