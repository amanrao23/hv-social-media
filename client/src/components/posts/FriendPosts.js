import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendPosts } from "../../actions/post";

import PostItem from "./PostItem";
import PostForm from "./PostForm";

const FriendPosts = ({ getFriendPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getFriendPosts();
  }, [getFriendPosts]);

  return (
    <Fragment>
      <PostForm />
      <h1 className="large text-primary">Friends Posts</h1>

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

FriendPosts.propTypes = {
  getFriendPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getFriendPosts })(FriendPosts);
