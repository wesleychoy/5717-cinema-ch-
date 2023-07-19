import React from "react";
import HeaderCompound from "../compounds/HeaderCompound";
import OptFormCompound from "../compounds/OptFormCompound";
import JumboCompound from "../compounds/JumboCompound";
import Seperator from "../components/Seperator/Seperator";
import FooterCompound from "../compounds/FooterCompound";

function Landing() {
  return (
    <>
      <HeaderCompound>
        <OptFormCompound />
      </HeaderCompound>
      <Seperator />
      <JumboCompound />
    </>
  );
}

export default Landing;
