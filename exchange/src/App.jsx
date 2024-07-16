import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/home/Home";
import About from "./components/About/About";
import Privacy from "./components/Privacy/Privacy";
import Cookie from "./components/Cookie/Cookie";

function App() {
  const [state, setState] = useState({
    user: { email: "Remus", password: "123456" },
    route: "signin",
    isSignedIn: false,
  });

  const onRouteChange = (newRoute) => {
    setState((prevState) => ({
      ...prevState,
      route: newRoute,
    }));
  };

  return (
    <div>
      <Navigation
        isSignedIn={state.isSignedIn}
        onRouteChange={onRouteChange}
      ></Navigation>

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                state.route === "home"
                  ? "/home"
                  : state.route === "signin"
                  ? "/signin"
                  : "/register"
              }
            ></Navigate>
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route
          path="*"
          element={<Navigate to={"/register"}></Navigate>}
        ></Route>
        <Route path="/about" component={<About></About>} />
        <Route path="/privacy" component={<Privacy></Privacy>} />
        <Route path="/cookie" component={<Cookie />} />
      </Routes>
    </div>
  );
}

export default App;
