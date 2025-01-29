/* eslint-disable react-hooks/rules-of-hooks */
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SIgnInForm";
import Home from "./components/home/Home";
import SignUp from "./components/SignUp/SignUp";
import About from "./components/About/About";
import Privacy from "./components/Privacy/Privacy";
import Cookie from "./components/Cookie/Cookie";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "./assets/api_url";

// News imports
import BusinessNews from "./components/News/BusinessNews";
import StocksNews from "./components/News/StocksNews";
import CryptoNews from "./components/News/CryptoNews";
import ForexNews from "./components/News/ForexNews";
import RealEstateNews from "./components/News/RealEstateNews";
import PreciousMetalsNews from "./components/News/PreciousMetalsNews";

// Market imports
import MarketOverview from "./components/Markets/MarketOverview/MarketOverview";
import WorldIndices from "./components/Markets/WorldIndices/WordlIndices";
import Quote from "./components/Quote/Quote";
import ErrorBoundary from "./components/Quote/ErrorBoundary";
import Futures from "./components/Markets/Futures/Futures";
import Bonds from "./components/Markets/Bonds/Bonds";
import Currencies from "./components/Markets/Currencies/Currencies";
import Options from "./components/Markets/Options/Options";

function App() {
  // Here is the default state of the app.
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Changes the app route.
  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  // Changes the app signin status.
  const onSignedInChange = (boolValue) => {
    setIsSignedIn(boolValue);
  };

  const getUserName = async (accessToken) => {
    try {
      // Trimite cererea către endpoint-ul backend
      const response = await axios.get(`${apiUrl}/auth/getUserDetails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      // Extrage firstname din răspuns
      const { firstname } = response.data;

      if (!firstname) {
        throw new Error("Firstname is missing from the API response.");
      }

      // Transformă prima literă în majusculă și restul în litere mici
      const formattedFirstname =
        firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

      // Salvează firstname formatat în localStorage
      localStorage.setItem("userName", formattedFirstname);

      // Actualizează numele utilizatorului (de exemplu, în UI)
      setUserName(formattedFirstname);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  let navigate = useNavigate();

  // When user refresh the page, we try to sign in automatically, by using the access
  // token stored in local storage.
  useEffect(() => {
    // Verifică dacă există un nume stocat în localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName); // Actualizează state-ul cu numele din localStorage
    }

    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken) {
        try {
          const response = await axios.get(`${apiUrl}/auth/verifyAccessToken`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          // Token valid
          if (response.status === 200 || response.status === 201) {
            setIsSignedIn(true);
            setRoute("home");
            navigate("/home");

            return;
          }
          // Token invalid
          else if (response.status === 400 || response.status === 401) {
            console.error("Access token invalid. Attempting to refresh.");

            // Attempt to obtain a new `accessToken` with `refreshToken`
            if (refreshToken) {
              try {
                const refreshResponse = await axios.post(
                  `${apiUrl}/auth/getNewAccessToken`,
                  {
                    headers: {
                      Authorization: `Bearer ${refreshToken}`
                    }
                  }
                );

                if (refreshResponse.status === 200) {
                  const newAccessToken = refreshResponse.data.accessToken;
                  const newRefreshToken = refreshResponse.data.refreshToken;

                  localStorage.setItem("accessToken", newAccessToken);
                  localStorage.setItem("refreshToken", newRefreshToken);

                  setIsSignedIn(true);
                  setRoute("home");
                  navigate("/home");
                }
              } catch (refreshError) {
                console.error(
                  "Failed to refresh access token. Please log in again.",
                  refreshError
                );
              }
            }
          }
        } catch (error) {
          console.error("Error checking access token.", error);
          // Here you can handle errors appropriately
        }
      } else {
        // No access token exists, use authentication logic (for example, navigate to the sign-in page)
        navigate("/signin");
      }
    };

    checkAccessToken();
  }, []);

  const signOut = () => {
    // Reset application state
    setRoute("signin");
    setIsSignedIn(false);

    // Redirect to the signIn page
    navigate("/signin");

    setUserName(""); // Resetează state-ul local
    localStorage.removeItem("userName"); // Șterge numele din localStorage

    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Here is an request to invalidate the session on the server
    axios
      .post(
        `${apiUrl}/auth/logout`,
        {},
        {
          // Body is empty if no additional data is needed
          headers: {
            Authorization: `Bearer ${accessToken}` // Add Authorization header with Bearer token
          }
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);

          // Remove access and refresh tokens from local storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          console.log("User logged out successfully");
          // Redirect to the signIn page after successful logout
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div>
      <Navigation
        isSignedIn={isSignedIn}
        onSignedInChange={onSignedInChange}
        onRouteChange={onRouteChange}
        signOut={signOut}
      ></Navigation>

      <Routes>
        {/* <Route
          path="/"
          element={
            <Navigate
              to={
                route === "home"
                  ? "/home"
                  : route === "signin"
                  ? "/signin"
                  : route === "cookie"
                  ? "/cookie"
                  : route === "privacy"
                  ? "/privacy"
                  : route === "about"
                  ? "/about"
                  : route === "forgotpassword"
                  ? "/forgotpassword"
                  : route === "change-password"
                  ? "/home#/change-password"
                  : route === "quote"
                  ? "/quote"
                  : "/register"
              }
            ></Navigate>
          }
        ></Route> */}
        <Route
          path="/home"
          element={
            <>
              {/* Header cu mesajul de salut */}
              <header
                style={{
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: "#1a1a1a",
                  color: "#FFD700"
                }}
              >
                {isSignedIn && userName && (
                  <p
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.2rem",
                      margin: "5px 0"
                    }}
                  >
                    Good to see you, {userName}! 👋
                  </p>
                )}
              </header>
              <Home
                setRoute={setRoute}
                setIsSignedIn={setIsSignedIn}
                signOut={signOut}
              />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <SignIn
              onRouteChange={onRouteChange}
              setIsSignedIn={setIsSignedIn}
              getUserName={getUserName}
            ></SignIn>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <SignUp
              onRouteChange={onRouteChange}
              setIsSignedIn={setIsSignedIn}
              getUserName={getUserName}
            ></SignUp>
          }
        ></Route>
        <Route path="/about" element={<About></About>} />
        <Route path="/privacy" element={<Privacy></Privacy>} />
        <Route path="/cookie" element={<Cookie />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/change-password"
          element={<ChangePassword signOut={signOut}></ChangePassword>}
        ></Route>

        <Route path="/news/business" element={<BusinessNews></BusinessNews>} />
        <Route path="/news/stocks" element={<StocksNews></StocksNews>} />
        <Route path="/news/crypto" element={<CryptoNews></CryptoNews>} />
        <Route path="/news/forex" element={<ForexNews></ForexNews>} />
        <Route
          path="/news/real-estate"
          element={<RealEstateNews></RealEstateNews>}
        />
        <Route
          path="/news/precious-metals"
          element={<PreciousMetalsNews></PreciousMetalsNews>}
        />

        {/* Market Routes */}

        <Route
          path="/markets/overview"
          element={<MarketOverview></MarketOverview>}
        />

        <Route
          path="/markets/world-indices"
          element={<WorldIndices></WorldIndices>}
        />

        <Route path="/markets/commodities" element={<Futures></Futures>} />

        <Route
          path="/quote/:symbol"
          element={
            <ErrorBoundary>
              <Quote />
            </ErrorBoundary>
          }
        />

        <Route path="/markets/bonds" element={<Bonds></Bonds>} />

        <Route path="/markets/currencies" element={<Currencies></Currencies>} />

        <Route
          path="/markets/options/most-active"
          element={<Options></Options>}
        />

        <Route
          path="/markets/options/top-gainers"
          element={<Options></Options>}
        />

        <Route
          path="/markets/options/top-losers"
          element={<Options></Options>}
        />

        <Route path="/markets/options/highest-implied-volatility" element={<Options />} /> {/* Adaugă această linie */} 
        <Route path="/markets/options/highest-implied%20volatility" element={<Options />} /> {/* Adaugă această linie */} 


        {/* <Route path="*" element={<Navigate to={"/signin"}></Navigate>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
