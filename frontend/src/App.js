// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginSignup/LoginPage";
import SignupPage from "./components/LoginSignup/SignupPage";
import LikedPage from "./components/Liked/LikedPage";
import MyProfile from "./components/MyProfile/MyProfile";
import AdvancedSwipe from "./components/HomePage/AdvancedSwipe";

function App() {
  return (
    <div className="App text-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<AdvancedSwipe />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
