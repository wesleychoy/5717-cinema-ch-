import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> cinema+ch </h1>
        <p> SAY GOODBYE TO ENDLESS MOVIE-SEARCHING ! </p>
        <Link to="/SignIn">
          <button> START NOW </button>
        </Link>
      </div>
      HelloWorld
    </div>
  )
}

export default Home
