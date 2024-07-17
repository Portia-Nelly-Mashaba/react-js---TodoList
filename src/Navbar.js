// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active">Register</NavLink>
        </li>
        <li>
          <NavLink to="/todo" activeClassName="active">Todo</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
