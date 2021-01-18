import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DisplayPost = ({
    auth,
    post: {  text, name, avatar, user, likes, comments, date }})=>(
    
    <Fragment>
    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {date}</p>
      </div>  
        
        </Fragment>
    )
    
DisplayPost.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    };
    
    const mapStateToProps = (state) => ({
    auth: state.auth,
    });
    
    export default connect(mapStateToProps,{})(
    DisplayPost
    );