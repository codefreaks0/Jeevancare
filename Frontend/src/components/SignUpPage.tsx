import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignupPage.css';
import { useUser } from './UserContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store the token
      localStorage.setItem('token', data.token);
      // Set user data in context
      setUser(data.user);
      // Navigate to user details page
      navigate('/user-details');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="signup-title">Create Account</h1>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group password-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={() => setShowPassword(true)} />
          )}
        </div>

        <div className="input-group password-group">
          <FaLock className="input-icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {showConfirmPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={() => setShowConfirmPassword(false)} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={() => setShowConfirmPassword(true)} />
          )}
        </div>

        <div className="terms-checkbox">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <span>
            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </span>
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

        <button type="submit" className="signup-button">
          Create Account
        </button>
      </form>

      <p className="signin-text">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default SignupPage; 