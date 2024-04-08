import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Changepass from "./components/Changepass"
import AdminDash from './components/AdminDash'
import UserDash from './components/UserDash'
import AdminDashboard from './components/DashAdmin'
import UserDashboard from './components/DashUser'
import UserProject from './components/ProjUser'
import AdminProject from './components/ProjAdmin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/changepass" element={<Changepass />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/approve" element={<AdminDashboard />} />
          <Route path="/skills" element={<UserDashboard />} />
          <Route path="/project" element={<UserProject />} />
          <Route path="/projectapprove" element={<AdminProject />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;