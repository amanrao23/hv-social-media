import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./components/profile-forms/CreateProfile";
import MyPosts from "./components/posts/MyPosts";
import FriendPosts from "./components/posts/FriendPosts";
import Post from "./components/post/Post";
import AllFriends from "./components/friends/AllFriends";
import AllRequests from "./components/friends/AllRequests";
import PotentialFriends from "./components/friends/PotentialFriends";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/myPosts" component={MyPosts} />
              <PrivateRoute exact path="/friendPosts" component={FriendPosts} />
              <PrivateRoute exact path="/posts/post/:id" component={Post} />
              <PrivateRoute exact path="/getFriends" component={AllFriends} />
              <PrivateRoute exact path="/getRequests" component={AllRequests} />
              <PrivateRoute
                exact
                path="/getPotentialFriends"
                component={PotentialFriends}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
