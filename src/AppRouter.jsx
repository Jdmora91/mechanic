import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Layout/NavBar';
import Dashboard from './pages/DashBoard';
import AddTruck from './pages/AddTruck';
import Footer from './components/Layout/Footer';
import Calendario from './pages/Calendario';


function AppRouter() {
  return (
    <Router>
        <Navbar />
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtruck" element={<AddTruck />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;