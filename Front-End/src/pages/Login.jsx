import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or Email is required';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Logged in successfully!');
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <input type="text" name="usernameOrEmail" placeholder="Username or Email" onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })} />
      {errors.usernameOrEmail && <div className="error-text">{errors.usernameOrEmail}</div>}

      <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      {errors.password && <div className="error-text">{errors.password}</div>}

      <button onClick={handleSubmit}>Submit</button>
      <p>Don't have an account? <span onClick={() => navigate('/signup')} className="form-switch-link">Sign Up</span></p>
    </div>
  );
};

export default Login;
