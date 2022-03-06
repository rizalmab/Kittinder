import React, { useEffect, useState } from "react";
import axios from "axios";
import DatingCard from "react-tinder-card";
import SwipeButtons from "./SwipeButtons";
// import CatCard from "./CatCard";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";

const HomePage = () => {
  // used for outOfFrame closure
  const [catsArr, setCatsArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/cats");
      console.log("response", response.data);
      setCatsArr(response?.data);
    };
    fetchData();
  }, []);

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
    <>
      <div className="datingCards">
        <div className="container flex justify-center mt-10">
          {catsArr.map((cat, index) => {
            return (
              <DatingCard
                className="swipe absolute"
                key={cat.name}
                preventSwipe={["up", "down"]}
              >
                <div
                  style={{ backgroundImage: `url(${cat.imgUrl})` }}
                  className="card relative bg-white p-5 bg-cover bg-center w-96 h-96 rounded-md shadow-vxl"
                >
                  <h3 className="absolute bottom-0 m-2 text-white">
                    {cat.name}
                  </h3>
                </div>
              </DatingCard>
            );
          })}
        </div>
        <div className="fixed flex w-full bg-white justify-evenly bottom-4">
          <IconButton className="p-5 shadow-vxl" onClick={() => handleUndo()}>
            <ReplayIcon className="text-orange-400" fontSize="large" />
          </IconButton>
          <IconButton
            className="p-5 shadow-vxl"
            onClick={() => handleDislike()}
          >
            <CloseIcon className="text-red-500" fontSize="large" />
          </IconButton>
          <IconButton className="p-5 shadow-vxl" onClick={() => handleLike()}>
            <FavoriteIcon className="text-green-300" fontSize="large" />
          </IconButton>
          <IconButton
            className="p-5 shadow-vxl"
            onClick={() => handleFavourite()}
          >
            <StarRateIcon className="text-blue-400" fontSize="large" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default HomePage;
