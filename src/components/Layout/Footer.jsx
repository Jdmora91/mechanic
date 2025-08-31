import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">MechTruck Manager - Sistema de Gestión para Mecánicos</p>
        <p className="footer-copyright">
          © {currentYear} J.D. Software Solutions • Todos los derechos reservados • Costa Rica
        </p>
      </div>
    </footer>
  );
};

export default Footer;