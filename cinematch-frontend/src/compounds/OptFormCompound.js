import React from "react";
import OptFormWrapper from "../components/OptForm/OptFormWrapper";
import OptFormText from "../components/OptForm/OptFormText";
import OptFormButton from "../components/OptForm/OptFormButton";

function OptFormCompound() {
  return (
    <>
      <OptFormText>
        Never second guess your movie choices with cinema+ch.
      </OptFormText>
      <OptFormWrapper>
        <OptFormButton>Get Started</OptFormButton>
      </OptFormWrapper>
    </>
  );
}

export default OptFormCompound;
