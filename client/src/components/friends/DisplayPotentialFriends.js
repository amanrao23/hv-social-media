import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {sendRequest} from '../../actions/user'

const DisplayPotentialFriends= ({sendRequest,auth,
    user:{_id,name}})=>(
    <Fragment>
     
        <div className="profile bg-light">
        <h2>{name}</h2>
        <button
            onClick={() => sendRequest(_id)}
            type="button"
            className="btn btn-light"
          >
            SEND FRIEND REQUEST
            
          </button>
        </div>
    
    </Fragment>
    )


DisplayPotentialFriends.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sendRequest:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{sendRequest})(
  DisplayPotentialFriends
);