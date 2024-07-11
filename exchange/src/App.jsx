
import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from './components/SignIn/SIgnInForm';

function App() {
  const [state, setState] = useState({
    user: { email: "Remus", password: "123456" },
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
        <p>here you are on the home page</p>
      ) : // <Home></Home>
      state.route === "signin" ? (
        <SignIn></SignIn>
      ) : (
        // <SignIn></SignIn>
        <p>Welcome on the register page</p>
        // <Register></Register>
      )}
    </div>
  );
}

export default App;

