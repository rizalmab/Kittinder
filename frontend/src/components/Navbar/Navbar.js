import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <div className="container mx-auto flex items-center justify-between z-100 border-solid border-2 border-black">
      <Dropdown />
      <img
        className="header_logo object-contain h-14"
        src="logo192.png"
        alt="header"
      />
      <IconButton>
        <ForumIcon fontSize="large" className="header_icon" />
      </IconButton>
    </div>
  );
};

export default Navbar;
