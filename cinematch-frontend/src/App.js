import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Recommendations from "./views/Recommendations";
import Movies from "./views/Movies";
import Friends from "./views/Friends";
import Profile from "./views/User/Profile";
import Protected from "./views/Protected";
import Landing from "./views/Landing";
import { auth } from './utils/firebase';
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(currentUser != null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsSignedIn(true);
      } else {
        setCurrentUser(null);
        setIsSignedIn(false);
      }
    });
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={isSignedIn ? <Navigate to ="/home" /> : <Navigate to ="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Protected isSignedIn={isSignedIn}><Home /></Protected>} />
        <Route path="/recommendations" element={<Protected isSignedIn={isSignedIn}><Recommendations /></Protected>} />
        <Route path="/movies" element={<Protected isSignedIn={isSignedIn}><Movies /></Protected>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/friends" element={<Protected isSignedIn={isSignedIn}><Friends /></Protected>} />
        <Route path="/user/profile" element={<Protected isSignedIn={isSignedIn}><Profile /></Protected>} /> 
      </Routes>
    </div>
  );
}