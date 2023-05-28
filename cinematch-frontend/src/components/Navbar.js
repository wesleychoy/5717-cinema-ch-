import React, { useState } from 'react'
import Logo from '../assets/cinematch.png';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css'

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
      setOpenLinks(!openLinks)
    };

  return (
    <div className="navbar">
        <div className='leftSide' id={openLinks ? "open" : "close"}>
            <img src={Logo} />
            <div className="hiddenLinks">
              <Link to="/"> Home </Link>
              <Link to="/recommendations"> Recommendations </Link>
              <Link to="/movies"> Movies </Link>
              <Link to="/friends"> Friends </Link>
              <Link to="/user"> User </Link>
            </div>
        </div>
        <div className='rightSide'>
            <Link to="/"> Home </Link>
            <Link to="/recommendations"> Recommendations </Link>
            <Link to="/movies"> Movies </Link>
            <Link to="/friends"> Friends </Link>
            <Link to="/user"> User </Link>
            <button onClick={toggleNavbar}>
                <ReorderIcon />
            </button>
        </div>
      
    </div>
  );
}

export default Navbar