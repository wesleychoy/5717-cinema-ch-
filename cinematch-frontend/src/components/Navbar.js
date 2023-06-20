import React, { useState } from 'react'
import Logo from '../assets/cinematch.png';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css'
import Dropdown from './Dropdown';

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
      setOpenLinks(!openLinks)
    };

    const handleMenuOne = () => {
      console.log('clicked one');
    };
  
    const handleMenuTwo = () => {
      console.log('clicked two');
    };  

    const handleMenuThree = () => {
      console.log('clicked three');
    };

    const handleMenuFour = () => {
      console.log('clicked four');
    };

  return (
    <div className="navbar">
        <div className='leftSide' id={openLinks ? "open" : "close"}>
            <img src={Logo} />
            <div className="hiddenLinks">
              <Link to="/home"> Home </Link>
              <Link to="/recommendations"> Recommendations </Link>
              <Link to="/movies"> Movies </Link>
              <Link to="/friends"> Friends </Link>
              <Link to="/user"> User</Link>
            </div>
        </div>
        <div className='rightSide'>
            <Link to="/home"> Home </Link>
            <Link to="/recommendations"> Recommendations </Link>
            <Link to="/movies"> Movies </Link>
            <Link to="/friends"> Friends </Link>
            <Link to="/user"> User</Link>
            <button onClick={toggleNavbar}>
                <ReorderIcon />
            </button>
        </div>
        <Dropdown
        trigger={<Link>Dropdown</Link>}
        menu={[
          <button onClick={handleMenuOne}>Profile</button>,
          <button onClick={handleMenuTwo}>History</button>,
          <button onClick={handleMenuThree}>Account Settings</button>,
          <button onClick={handleMenuFour}>Log Out</button>,
        ]}
        />  
    </div>
  );
}

export default Navbar