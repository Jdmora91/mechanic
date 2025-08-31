import React from 'react';
import logo from '../../assets/images/MechTruck.jpg';
import './NavBar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img
          src={logo}
          alt="MechTruck Logo"
          className="navbar-logo"
        />
          <div className="navbar-title">
        <h1>MechTruck Manager</h1>
      </div>
      </Link>
    
      <div className="navbar-item">
        <select className="language-selector">
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
