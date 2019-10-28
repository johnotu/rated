import React, { useState } from 'react';
import axios from 'axios';

// import twitterLogo from '../../images/twitter.png';
import bannerImg from '../../images/banner.png'

const UnderConstruction = () => {
  const [email, setEmail] = useState('');
  const [isInputValid, setIsInputValid] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = event => {
    event.preventDefault();
    // Validate input before setting state
    if (!isValidEmail(event.target.value)) {
      setIsInputValid(false);
      return;
    }
    setIsInputValid(true);
    setIsSubmitDisabled(false);
    setEmail(event.target.value);
  }

  const handleSubmit = () => {
    // Validate email
    if (!isValidEmail(email)) {
      setIsInputValid(false);
      return;
    }

    // Disable submit button to prevent multiple clicks
    setIsSubmitDisabled(true);
  
    const authstring = process.env.REACT_APP_AUTHSTRING;
    axios(`${process.env.REACT_APP_CREATE_LEAD_URL}`, {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      data: { email, authstring }
    })
      .then(response => {
        if (response.status === 201) {
          // Clear state
          setIsInputValid('');
          setEmail('');
          alert('Thank you! Look out for an email from us when Rated launches 🤞');
        }
        console.log('Success');
      })
      .catch(error => {
        console.log('Error:', error.response.status, error.response.data)
        alert(error.response.data);
      });
  }

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  return (
    <div className="container-fluid">
      <div className="row align-items-center bg-light" style={{ height: '100vh' }}>
        <div className="col-md-4 text-center landing-content">
          <img src={bannerImg} alt="banner" className="img-fluid" max-width="100%" height="auto" />
          <h2 className="text-danger">Under Construction !</h2>
        </div>

        <div className="col-md-8 landing-content landing-content-text">
          <h2 className="display-4 text-primary rated">Rated</h2>
          <h2 className="">Will probably be the only social media platform that lets you control what trends.</h2>
          <p className="lead">We are currently building the project and can let you know when beta is released</p>
          <div className="form-row">
            <div className="col">
              <input type="email" defaultValue={email} placeholder="Enter your email" className={`form-control ${isInputValid === '' ? '' : isInputValid ? 'is-valid' : 'is-invalid'}`} onChange={handleInputChange} />
              <div className="invalid-feedback">Please provide a valid email.</div>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary" onClick={handleSubmit} disabled={isSubmitDisabled ? true : false}>Notify me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnderConstruction;