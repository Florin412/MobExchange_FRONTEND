import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/home/Home";

function App() {
  const [state, setState] = useState({
    user: {
      id: 1,
      firstName: "Remus",
      lastName: "Lupau",
      email: "lupau.remus15@gmail.com",
      password: "abcd1234",
    },
    route: "register",
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

      {state.route === "home" ? (
        <div>
          <Home></Home>
          {/* <Home></Home> */}
        </div>
      ) : state.route === "signin" ? (
        <SignIn></SignIn>
      ) : (
        <div>
          <p>Welcome on the register page</p>
          <SignUp></SignUp>
          {/* <Register></Register>

          {/* <Home firstname="Leo" lastname="Smetch" symbol="" /> */}
        </div>
      )}
    </div>
  );
}

export default App;
