import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("authToken");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevents Link from navigating
    sessionStorage.removeItem("authToken");
    alert("Logged out successfully!");
    navigate("/login");
  };    

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        ZenAlert
      </Link>
      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label="Toggle Navigation Menu"
      >
        ☰
      </button>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mental-wellbeing">Mental Well-being</Link></li>
        <li><Link to="/emergency">Emergency</Link></li>
        <li><Link to="/videorecommend">VideoRecommendation</Link></li>
        <li><Link to="/news">News</Link></li>
        {isLoggedIn ? (
          <li>
            <Link 
              to="/login" 
              onClick={handleLogout} 
              className="logout-link"
            >
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li><Link to="/taskmanager">Task Manager</Link></li>
            <li><Link to="/moodtracker">Mood Tracker</Link></li>
        
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
