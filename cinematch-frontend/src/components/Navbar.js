import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/Navbar.css';
import Dropdown from './Dropdown';
import Logo from '../assets/cinematch.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleMenuOne = () => {
    navigate('/user/profile')
  };
      
  const handleMenuTwo = () => {
    navigate('/user/history')
  };  
    
  const handleMenuThree = () => {
    navigate('/user/account')
  };
    
  const handleMenuFour = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src={Logo} />
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/recommendations"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Recommendations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/movies"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/friends"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <Dropdown
              className="nav-links"
              trigger={<text className="nav-links">User</text>}
              menu={[
                <button onClick={handleMenuOne}>Profile</button>,
                <button onClick={handleMenuTwo}>History</button>,
                <button onClick={handleMenuThree}>Account</button>,
                <button onClick={handleMenuFour}>Log Out</button>,
              ]}
              />
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;