import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> WELCOME TO CINEMA+CH ! </h1>
        <Link to="/">
            <button> SIGN OUT </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
