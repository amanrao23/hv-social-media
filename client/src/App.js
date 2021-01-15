import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import './App.css';
import { LOGOUT } from './actions/types';

import Dashboard from './components/dashboard/Dashboard' 


import PrivateRoute from './components/routing/PrivateRoute'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/profile-forms/CreateProfile'
import MyPosts from './components/posts/MyPosts'
import FriendPosts from './components/posts/FriendPosts'



if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App=()=>{
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  
  return (
  <Provider store={store}>
<Router>
<Fragment>
<Navbar/>
<Route exact path="/" component={Landing}/>
<section className="container">
<Switch>
<Route exact path='/register' component={Register}/>
<Route exact path='/login' component={Login}/>
<PrivateRoute exact path='/dashboard' component={Dashboard}/>
<PrivateRoute exact path='/create-profile' component={CreateProfile}/>
<PrivateRoute exact path='/myPosts' component={MyPosts}/>
<PrivateRoute exact path='/friendPosts' component={FriendPosts}/>
</Switch>
</section>
</Fragment>
</Router>
</Provider>)

}

export default App;
