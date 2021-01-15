import React,{Fragment,useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile} from '../../actions/profile'
const CreateProfile = ({createProfile,history}) => {
    
    const [formData,setFormData]=useState({
        bio:''
    })
    const {
        bio
    }=formData
    
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
    
    
    const onSubmit=e=>{
        e.preventDefault()
        createProfile(formData,history)
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
     
      <form className="form" onSubmit={e=>onSubmit(e)}>
        
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e=>onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
    )
}

CreateProfile.propTypes = {
CreateProfile:PropTypes.func.isRequired,
}

export default connect(null,{createProfile})(withRouter(CreateProfile))
