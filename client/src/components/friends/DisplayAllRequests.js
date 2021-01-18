import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRequests, acceptRequest } from "../../actions/user";

const DisplayAllRequests = ({
  getRequests,
  acceptRequest,
  auth,
  friend: { _id, sender, name },
}) => {
  useEffect(() => {
    getRequests()
  }, [acceptRequest]);
  return (
    <Fragment>
      <div className="profile bg-light">
        <h2>{sender}</h2>
        <h2>{name}</h2>
        <button onClick={() => acceptRequest(_id)}>Accept Request</button>
      </div>
    </Fragment>
  );
};

DisplayAllRequests.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getRequests, acceptRequest })(
  DisplayAllRequests
);
