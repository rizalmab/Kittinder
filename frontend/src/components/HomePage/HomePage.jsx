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
  const swiped = (direction, nameToDelete, idToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    // console.log("arguments", direction, nameToDelete, idToDelete, index);
    if (direction === "left") {
      setDislikedCatsArr([...dislikedCatsArr, idToDelete]);
    } else if (direction === "right") {
      setLikedCatsArr([...likedCatsArr, idToDelete]);
    }
    console.log("dislikedCatsArr: ", dislikedCatsArr);
    console.log("likedCatsArr: ", likedCatsArr);
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
    // find the last direction
    if (lastDirection === "left") {
      // console.log("the last card was disliked");
      dislikedCatsArr.pop();
    } else if (lastDirection === "right") {
      // console.log("the last card was liked");
      likedCatsArr.pop();
    }
    console.log("dislikedCatsArr: ", dislikedCatsArr);
    console.log("likedCatsArr: ", likedCatsArr);
  };

  return (
    <>
      <div className="datingCards container mx-auto flex justify-center">
        <div className="container flex justify-center mt-10">
          {catsArr?.map((cat, index) => {
            return (
              <DatingCard
                className="swipe absolute"
                key={index}
                preventSwipe={["up", "down"]}
                ref={childRefs[index]}
                onSwipe={(dir) => swiped(dir, cat.name, cat._id, index)}
                onCardLeftScreen={() => outOfFrame(cat.name, cat._id, index)}
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
        <div className="fixed flex w-1/2 bg-white justify-evenly bottom-4 rounded-xl">
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
            onClick={(e) => {
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
