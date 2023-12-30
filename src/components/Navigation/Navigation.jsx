import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <nav className='flex justify-between items-center px-12 py-8'>
        <div className="logo">
          <a href="/"><img src="./src/assets/logo.svg" alt="logo" /></a>
        </div>
        <div className={`menu ${menuActive ? 'active' : ''}`}>
          <NavLink className="menu_item mx-4" to="/">Home</NavLink>
          <NavLink className="menu_item mx-4" to="/concerts">Concerts</NavLink>
          <NavLink className="menu_item mx-4" to="/tickets">Tickets</NavLink>
          <NavLink className="menu_item mx-4" to="/contact">Contact</NavLink>
          <img
            className={`cross-icon ${menuActive ? 'active' : ''}`}
            src="./src/assets/cross.svg"
            alt="Cross"
            onClick={toggleMenu}
          />
        </div>
        <div className="burger">
        <img
            className={`burger ${menuActive ? 'active' : ''}`}
            src="./src/assets/burger-menu.svg"
            alt="Burger Menu"
            onClick={toggleMenu}
          />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
