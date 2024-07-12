import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";

function App() {
  // This is the initial state for this app.
  const initState = {
    user: {
      id: 1,
      firstName: "Mihai",
      lastName: "Ion",
      email: "nume.prenume@gmail.com",
      password: "abcd1234"
    },
    route: "signin",
    isSignedIn: false
  };

  // const [state, setState] = useState(initState);
  const [state] = useState(initState);

  console.log(state);

  return (
    <div>
      <Navigation isSignedIn={state.isSignedIn}></Navigation>

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
