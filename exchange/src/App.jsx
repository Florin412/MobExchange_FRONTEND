import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";

function App() {
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const onSignedInChange = (boolValue) => {
    setSignIn(boolValue);
  };

  return (
    <div>
      <Navigation
        isSignedIn={isSignedIn}
        onSignedInChange={onSignedInChange}
        onRouteChange={onRouteChange}
      ></Navigation>

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                route === "home"
                  ? "/home"
                  : route === "signin"
                  ? "/signin"
                  : "/signup"
              }
            ></Navigate>
          }
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<Navigate to={"/signin"}></Navigate>}></Route>
      </Routes>
    </div>
  );
}

export default App;
