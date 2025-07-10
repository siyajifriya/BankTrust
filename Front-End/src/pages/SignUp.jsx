import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Signed up successfully!');
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <input type="text" name="fullName" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
      {errors.fullName && <div className="error-text">{errors.fullName}</div>}

      <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      {errors.email && <div className="error-text">{errors.email}</div>}

      <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      {errors.password && <div className="error-text">{errors.password}</div>}

      <button onClick={handleSubmit}>Submit</button>
      <p>Already have an account? <span onClick={() => navigate('/login')} className="form-switch-link">Log In</span></p>
    </div>
  );
};

export default SignUp;
