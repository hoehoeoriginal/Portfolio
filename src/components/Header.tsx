import React, { useState } from "react";
import "../css/Header.css";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">My Portfolio</div>
      {menuOpen && (
        <nav className="menu">
          <ul>
            <li><a href="#home" onClick={toggleMenu}>HOME</a></li>
            <li><a href="#profile" onClick={toggleMenu}>PROFILE</a></li>
            <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
          </ul>
        </nav>
      )}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
};

export default Header;
