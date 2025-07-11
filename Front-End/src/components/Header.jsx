import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    
    
    
    <header className="navbar">
      <Link to='/' style={{color:'white'}}><div className="logo">💰 BankTrust</div></Link>

      <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        <Link to="/signup" className="nav-button">📝 Sign Up</Link>
        <Link to="/login" className="nav-button">👤 Log In</Link>
      </nav>

      <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </button>
    </header>
    
    
  );
};
