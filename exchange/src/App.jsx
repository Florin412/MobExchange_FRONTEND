import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from './components/SignIn/SIgnInForm';
import SignUp from "./components/SignUp/SignUp";

function App() {
  const [state, setState] = useState({
    user: { email: "Remus", password: "123456" },
    route: "signin",
    isSignedIn: false
  });

  const onRouteChange = (newRoute) => {
    setState((prevState) => ({
      ...prevState,
      route: newRoute
    }));
  };

  return (
    <div>
      <Navigation
        isSignedIn={state.isSignedIn}
        onRouteChange={onRouteChange}
      ></Navigation>

      <Routes>
        <Route path="/" element={<Navigate to={state.route === "home" ? "/home" : state.route === "signin" ? "/signin" : "/register"}></Navigate>}></Route>
        <Route path="/home" element={<p>here you are on the home page</p>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/register" element={<SingUp></SingUp>}></Route>
        <Route path="*" element={<Navigate to={"/register"}></Navigate>}></Route>
      </Routes>
      </div>
  );
}

export default App;

