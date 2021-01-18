import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPotentialFriends } from "../../actions/user";
import DisplayPotentialFriends from "./DisplayPotentialFriends";

const PotentialFriends = ({ auth, getPotentialFriends, user: { users } }) => {
  useEffect(() => {
    getPotentialFriends();
  }, [getPotentialFriends]);

  return (
    <Fragment>
      {
        <div className="posts">
          {users.map((user) => (
            <DisplayPotentialFriends key={user._id} user={user} />
          ))}
        </div>
      }
    </Fragment>
  );
};

PotentialFriends.propTypes = {
  getPotentialFriends: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPotentialFriends })(
  PotentialFriends
);
