import { Route, Routes } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Recommendations from "./views/Recommendations";
import Movies from "./views/Movies";
import Friends from "./views/Friends";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
}