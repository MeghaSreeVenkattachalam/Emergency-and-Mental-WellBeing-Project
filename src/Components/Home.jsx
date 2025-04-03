import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("authToken");

  return (
    <div className="home-container">
      <h1>Welcome to Safe Space</h1>
      <p>Your mental health matters. We’re here to help.</p>
      {!isLoggedIn && (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
