import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import HeaderWrapper from "../components/Header/HeaderWrapper";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import Warning from "../components/Header/Warning";
import Logo from "../components/Header/Logo";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const IsInvalid = password === "" || emailAddress === "";

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password)
      .then( () => {
          console.log("You have signed in!");
          navigate('/');
      });
    } catch (error) {
      if (error.code == 'auth/wrong-password') {
          setError('Invalid password. Please try again!')
      } else if (error.code == 'auth/user-not-found') {
          setError('Invalid email. Please try again!')
      } else if (error.code == 'auth/too-many-requests') {
          setError('Too many attempts with wrong credentials. Please try again later!')
      } else {
          console.log(error.message)
      }
    }
  };

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSignIn} method="POST">
            <Logo/>
            <SignFormTitle>Sign In</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign In</SignFormButton>
            <SignFormText>
              New to cinema+ch?
              <SignFormLink href="/signup">Sign up now.</SignFormLink>
            </SignFormText>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
    </>
  );
}

export default SignIn;
