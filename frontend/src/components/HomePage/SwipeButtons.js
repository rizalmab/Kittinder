import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";

const SwipeButtons = () => {
  const handleUndo = () => {
    console.log("Undo button clicked");
  };

  const handleLike = () => {
    console.log("Like button clicked");
    // print out array of liked cats (their Ids)
    // swipe the cat to the right
  };

  const handleDislike = () => {
    console.log("Dislike button clicked");
  };

  const handleFavourite = () => {
    console.log("Favourite button clicked");
  };

  return (
    <div className="fixed flex w-full bg-white justify-evenly bottom-4">
      <IconButton className="p-5 shadow-vxl" onClick={() => handleUndo()}>
        <ReplayIcon className="text-orange-400" fontSize="large" />
      </IconButton>
      <IconButton className="p-5 shadow-vxl" onClick={() => handleDislike()}>
        <CloseIcon className="text-red-500" fontSize="large" />
      </IconButton>
      <IconButton className="p-5 shadow-vxl" onClick={() => handleLike()}>
        <FavoriteIcon className="text-green-300" fontSize="large" />
      </IconButton>
      <IconButton className="p-5 shadow-vxl" onClick={() => handleFavourite()}>
        <StarRateIcon className="text-blue-400" fontSize="large" />
      </IconButton>
      {/* <IconButton className="p-5 shadow-vxl">
        <FlashOnIcon className="text-purple-600" fontSize="large" />
      </IconButton> */}
    </div>
  );
};
export default SwipeButtons;
