import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";

function App() {
  const [state, setState] = useState({
    user: {
      id: 1,
      firstName: "Remus",
      lastName: "Lupau",
      email: "lupau.remus15@gmail.com",
      password: "abcd1234"
    },
    route: "register",
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

      {state.route === "home" ? (
        <div>
          <p>Home page</p>
          {/* <Home></Home> */}
        </div>
      ) : state.route === "signin" ? (
        <SignIn></SignIn>
      ) : (
        <div>
          <p>Welcome on the register page</p>
          {/* <Register></Register> */}
        </div>
      )}
    </div>
  );
}

export default App;
