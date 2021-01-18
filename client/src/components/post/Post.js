import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import DisplayPost from "./DisplayPost";

const Post = ({ auth, getPost, post: { post, loading }, match }) => {
  let { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, 1 == 1]);

  if (post) {
    return (
      <Fragment>
        <DisplayPost key={id} post={post} />
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
