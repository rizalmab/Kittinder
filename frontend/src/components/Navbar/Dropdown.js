import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";

const Dropdown = () => {
  return (
    <div>
      <IconButton>
        <PersonIcon fontSize="large" className="header_icon" />
      </IconButton>
    </div>
  );
};

export default Dropdown;
