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
      <div className="menu-container">
        <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          {menuOpen ? "×" : "＋"}
        </button>
        <nav className={`menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="#home" onClick={toggleMenu}>HOME</a></li>
            <li><a href="#profile" onClick={toggleMenu}>PROFILE</a></li>
            <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
