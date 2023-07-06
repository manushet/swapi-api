import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>StarDB</h3>
      <ul className="d-flex">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/characters/">Characters</Link></li>        
        <li><Link to="/planets/">Planets</Link></li>
        <li><Link to="/starships/">Starships</Link></li>        
      </ul>
    </div>
  );
};

export default Header;