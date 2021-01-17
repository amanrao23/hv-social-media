import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DisplayFriends= ({auth,
    friend:{_id,name,photo}})=>(
    <Fragment>
     
        <div className="profile bg-light">
        <h2> {photo}</h2>
        <h2>{name}</h2>
        </div>
    
    </Fragment>
    )


DisplayFriends.propTypes = {
  friend: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{})(
  DisplayFriends
);