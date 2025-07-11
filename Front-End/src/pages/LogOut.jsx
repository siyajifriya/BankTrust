import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear any stored user data (localStorage, sessionStorage, etc.)
    localStorage.clear();
    sessionStorage.clear();

    // ✅ Redirect to home (dashboard or landing) after 3 seconds
    const timer = setTimeout(() => {
      navigate('/'); // <-- redirecting to home instead of /login
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>You have been logged out.</h2>
        <p>Redirecting to home page...</p>
      </div>
    </div>
  );
}

export default Logout;
