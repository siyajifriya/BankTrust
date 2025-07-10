// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Form.css'

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       alert('Signed up successfully!');
//       navigate('/');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Sign Up</h2>
//       <input type="text" name="fullName" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
//       {errors.fullName && <div className="error-text">{errors.fullName}</div>}

//       <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//       {errors.email && <div className="error-text">{errors.email}</div>}

//       <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//       {errors.password && <div className="error-text">{errors.password}</div>}

//       <button onClick={handleSubmit}>Submit</button>
//       <p>Already have an account? <span onClick={() => navigate('/login')} className="form-switch-link">Log In</span></p>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address
      });

      alert('Signed up successfully!');
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      alert(errorMsg);
      console.error('Registration error:', error.response || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleInputChange}
      />
      {errors.fullName && <div className="error-text">{errors.fullName}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      {errors.email && <div className="error-text">{errors.email}</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {errors.password && <div className="error-text">{errors.password}</div>}

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleInputChange}
      />
      {errors.phone && <div className="error-text">{errors.phone}</div>}

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      {errors.address && <div className="error-text">{errors.address}</div>}

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} className="form-switch-link">
          Log In
        </span>
      </p>
    </div>
  );
};

export default SignUp;

