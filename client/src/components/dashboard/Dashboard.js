   import React,{Fragment, useEffect} from 'react'
   import {Link } from 'react-router-dom'
   import PropTypes from 'prop-types'
   import {connect} from 'react-redux'
   import {getCurrentProfile} from '../../actions/profile'
   import PostForm from '../posts/PostForm'

   const Dashboard = ({getCurrentProfile,auth,profile:{profile,loading}}) => {
       useEffect(()=>{
           getCurrentProfile()
       },[])
       return (
           <Fragment>
           {profile!==null ? (
               <Fragment>
               {profile.bio}
               <PostForm />
               </Fragment>
               
           ):(<Fragment>
            Setup Profile:
            <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
            
            </Link>
            </Fragment>)}
           </Fragment>
       )
   }
   
   Dashboard.propTypes = {
   getCurrentProfile:PropTypes.func.isRequired,
   auth:PropTypes.object.isRequired,
   profile:PropTypes.object.isRequired,
   }
   
   const mapStateToProps=state=>({
       auth:state.auth,
       profile:state.profile
   })
   export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)
   