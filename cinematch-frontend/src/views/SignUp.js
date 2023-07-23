import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, setDoc } from '@firebase/firestore';
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
import Logo from "../components/Header/Logo";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const IsInvalid = password === "" || emailAddress === "" || firstName === "" || lastName === "" || username === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, emailAddress, password).then(() => {
          console.log("Account created with Firebase Auth");
      });
      const document = await setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          firstName: firstName,
          lastName: lastName, 
          username: username,
          email: emailAddress  
      }).then( async () => {
          await setDoc(doc(db, `users/${auth.currentUser.uid}/history`, "cinematch-dummy-doc"), {
              movie: 'dummy',
              rating: 100
      })
      }).then(
          console.log("wrote user to database"),
          navigate('/home')
      )
    }
    catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        setError('Email already in use')
      } else if (error.code == 'auth/invalid-email') {
        setError('Please enter a valid email')
      }
      console.log(`There was an error: ${error}`);
    }
  };


  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSignUp} method="POST">
            <Logo/>
            <SignFormTitle>Sign Up</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
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
            <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
            <SignFormText>
              Already a user?
              <SignFormLink href="/signin">Sign in now.</SignFormLink>
            </SignFormText>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
    </>
  );
}

export default SignUp;
