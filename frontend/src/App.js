import { useEffect, useState } from "react";
import UserContext from "./components/context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginSignup/LoginPage";
import SignupPage from "./components/LoginSignup/SignupPage";
import LikedPage from "./components/Liked/LikedPage";
import MyProfile from "./components/MyProfile/MyProfile";
import AdvancedSwipe from "./components/HomePage/AdvancedSwipe";
import CreatedProfile from "./components/MyProfile/CreatedProfile";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      // search for token
      let token = localStorage.getItem("auth-token");
      console.log("token", token);
      // if no token, set token to ""
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // get response for token
      const tokenResponse = await axios.post(
        "http://localhost:8001/api/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log("tokenResponse", tokenResponse);
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:8001/api/users/", {
          headers: { "x-auth-token": token },
        });
        console.log("userRes", userRes);
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App text-white">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/advanced" element={<AdvancedSwipe />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/created-profile/:id" element={<CreatedProfile />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
