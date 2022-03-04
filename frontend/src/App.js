// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginSignup/LoginPage";
import SignupPage from "./components/LoginSignup/SignupPage";

function App() {
  return (
    <div className="App text-white">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="" element={<LikedPage />} />
          <Route path="" element={<SignupPage />} />
          <Route path="" element={<MyProfile />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
