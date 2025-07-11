import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PersonalLoan from './pages/personimg';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Contact from './pages/Contact';
import MyLoans from './pages/MyLoans';
import ApplyLoan from './pages/ApplyLoan';
import EmiSchedule from './pages/EmiSchedule';
import Logout from './pages/LogOut';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />   
        <Route path="/my-loans" element={<MyLoans />} />
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/emischedule" element={<EmiSchedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalloan" element={<PersonalLoan />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/contact" element={<Contact/>}/>


        





       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;