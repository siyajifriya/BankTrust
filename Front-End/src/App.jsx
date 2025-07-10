import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PersonalLoan from './pages/personimg';
import SignUp from './pages/SignUp';
import Login from './pages/Login';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalloan" element={<PersonalLoan />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>





       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;