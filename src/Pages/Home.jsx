import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/images/logo.svg";

const Home = () => {
  return (
    <div className="hero">
      <img src={logo} alt="Teknolojik Yemekler Logo" className="logo" />
      <h1>Kod Acıktırır, Pizza Doyurur</h1>
      <Link to="/order">
        <button className="order-button">Acıktım</button>
      </Link>
    </div>
  );
};

export default Home;
