import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import DropdownMenu from "./DropdownMenu";
import { useContext } from "react";
import UserContext from "../context/context";
import LoginDropdown from "./LoginDropdown";
import logo from "../../images/Cat.png";

const Navbar = () => {
  const contextNavbar = useContext(UserContext);
  console.log("contextNavbar", contextNavbar);
  return (
    <div className="container mx-auto flex items-center justify-between z-100 border-solid border-2 border-black">
      {contextNavbar.userData.user ? <DropdownMenu /> : <LoginDropdown />}
      <img
        className="header_logo object-contain h-14"
        src={logo}
        alt="header"
      />
      <IconButton>
        <ForumIcon fontSize="large" className="header_icon" />
      </IconButton>
    </div>
  );
};

export default Navbar;
