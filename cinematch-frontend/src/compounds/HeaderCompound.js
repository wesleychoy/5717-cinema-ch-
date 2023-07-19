import React from "react";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import SigninButton from "../components/Header/SigninButton";
import FeatureWrapper from "../components/Header/FeatureWrapper";
import FeatureTitle from "../components/Header/FeatureTitle";
import Warning from "../components/Header/Warning";

function HeaderCompound({ children }) {
  return (
    <HeaderWrapper className="header-wrapper-home">
      <FeatureWrapper className="feature-wrapper-home">
        <FeatureTitle className="feature-title-home">
          Unlimited movie recommendations.
        </FeatureTitle>
      </FeatureWrapper>
      {children}
    </HeaderWrapper>
  );
}

export default HeaderCompound;
