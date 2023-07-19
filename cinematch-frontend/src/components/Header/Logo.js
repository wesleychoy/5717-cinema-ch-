import React from "react";
import "./HeaderStyles.css";
import logo from "../../assets/cinematch.png";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src={logo} alt="Cinematch logo" />
      </a>
    </div>
  );
}

export default Logo;
