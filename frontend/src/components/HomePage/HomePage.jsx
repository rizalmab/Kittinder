import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import DatingCard from "react-tinder-card";
// import SwipeButtons from "./SwipeButtons";
// import CatCard from "./CatCard";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const HomePage = () => {
  // used for outOfFrame closure
  const [catsArr, setCatsArr] = useState([]);
  const [likedCatsArr, setLikedCatsArr] = useState([]);
  const [dislikedCatsArr, setDislikedCatsArr] = useState([]);
  //! Advanced swipe
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/cats");
      // console.log("response", response.data.data);
      setCatsArr(response?.data?.data);
      setCurrentIndex(response?.data?.data.length - 1);
    };
    fetchData();
  }, []);

  const childRefs = useMemo(
    () =>
      Array(catsArr?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [catsArr]
  );
  // console.log("childRefs", childRefs);

  //! updates the current index and currentIndexRef
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < catsArr.length - 1;

  const canSwipe = currentIndex >= 0;

  //! set last direction (for undo) and decrease current index (since one card swiped away)
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    //! handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    console.log("canSwipe", canSwipe);
    console.log("currentIndex", currentIndex);
    if (canSwipe && currentIndex < catsArr.length) {
      await childRefs[currentIndex].current.swipe(dir); //! Swipe the card! Since conditions are met
    }
  };

  //! increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  // const handleUndo = () => {
  //   console.log("Undo button clicked");
  // };

  // const handleLike = () => {
  //   console.log("Like button clicked");
  //   // print out array of liked cats (their Ids)
  //   // swipe the cat to the right
  // };

  // const handleDislike = () => {
  //   console.log("Dislike button clicked");
  // };

  // const handleFavourite = () => {
  //   console.log("Favourite button clicked");
  // };

  // const onSwipe = (direction) => {
  //   console.log("You swiped: " + direction);
  // };

  // const onCardLeftScreen = (myIdentifier) => {
  //   console.log(myIdentifier + " left the screen");
  // };

  return (
    <>
      <div className="datingCards">
        <div className="container flex justify-center mt-10">
          {catsArr?.map((cat, index) => {
            return (
              <DatingCard
                className="swipe absolute"
                key={index}
                preventSwipe={["up", "down"]}
                // onSwipe={onSwipe}
                // onCardLeftScreen={() => onCardLeftScreen(cat.name)}
                ref={childRefs[index]}
                onSwipe={(dir) => swiped(dir, cat.name, index)}
                onCardLeftScreen={() => outOfFrame(cat.name, index)}
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
          <IconButton
            className="p-5 shadow-vxl"
            onClick={() => {
              goBack();
            }}
          >
            <ReplayIcon className="text-orange-400" fontSize="large" />
          </IconButton>
          <IconButton
            className="p-5 shadow-vxl"
            onClick={() => {
              swipe("left");
            }}
          >
            <CloseIcon className="text-red-500" fontSize="large" />
          </IconButton>
          <IconButton
            className="p-5 shadow-vxl"
            onClick={() => {
              swipe("right");
            }}
          >
            <FavoriteIcon className="text-green-300" fontSize="large" />
          </IconButton>
          <IconButton
            className="p-5 shadow-vxl"
            // onClick={() => handleFavourite()}
          >
            <StarRateIcon className="text-blue-400" fontSize="large" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default HomePage;
