// components/Header.jsx
import React from 'react';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Mi Aplicación </h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
