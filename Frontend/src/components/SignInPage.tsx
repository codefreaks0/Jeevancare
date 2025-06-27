import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './SignInPage.css';
import { useUser } from './UserContext';

const SignInPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/home'); // Redirect to home page on successful sign-in
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Sign-in failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={handleBackClick} />
        <h1 className="signin-title">Sign In</h1>
      </div>
      <form className="signin-form">
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group password-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="signin-button" onClick={handleSignIn}>Sign In</button>
      </form>
      <p className="signup-text">
        Don't have an account? <a onClick={() => navigate('/signup')}>Sign up</a>
      </p>
      <div className="or-divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>
      <div className="social-signin-buttons">
  <button className="social-button google-button">
    {<svg className='icon' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0002 10.225C20.0002 9.56665 19.9406 8.94165 19.8384 8.33331H10.2173V12.0916H15.726C15.4791 13.325 14.7554 14.3666 13.6826 15.075V17.575H16.9691C18.8933 15.8333 20.0002 13.2666 20.0002 10.225Z" fill="#4285F4"/>
<path d="M10.2174 20C12.976 20 15.2834 19.1 16.9692 17.575L13.6827 15.075C12.7632 15.675 11.5967 16.0417 10.2174 16.0417C7.55244 16.0417 5.29616 14.2833 4.48731 11.9083H1.09863V14.4833C2.77594 17.75 6.22422 20 10.2174 20Z" fill="#34A853"/>
<path d="M4.48702 11.9083C4.27416 11.3083 4.16347 10.6667 4.16347 9.99999C4.16347 9.33333 4.28267 8.69166 4.48702 8.09166V5.51666H1.09834C0.400169 6.86666 0 8.38333 0 9.99999C0 11.6167 0.400169 13.1333 1.09834 14.4833L4.48702 11.9083Z" fill="#FBBC05"/>
<path d="M10.2173 3.95833C11.7243 3.95833 13.0696 4.46667 14.1338 5.45834L17.0457 2.60833C15.2833 0.991668 12.9759 0 10.2173 0C6.2241 0 2.77582 2.25 1.09851 5.51667L4.48719 8.09167C5.29604 5.71667 7.55232 3.95833 10.2173 3.95833Z" fill="#EA4335"/>
</svg>
}
    Sign in with Google
  </button>

  <button className="social-button facebook-button">
    {<svg className='icon'  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_754)">
  <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#3577E5"/>
  <path d="M10.9333 15.9333V10.5333H12.7333L13 8.39998H10.9333V7.06665C10.9333 6.46665 11.1333 6.06665 12 6.06665H13.1333V4.13332C12.9333 4.13332 12.2667 4.06665 11.5333 4.06665C9.93333 4.06665 8.8 5.06665 8.8 6.86665V8.39998H7V10.5333H8.8V15.9333H10.9333Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_1_754">
  <rect width="20" height="20" fill="white"/>
  </clipPath>
  </defs>
  </svg>
}
    Sign in with Facebook
  </button>
</div>

</div>
  );
};

export default SignInPage;