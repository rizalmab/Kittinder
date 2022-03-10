import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import LikedCards from "./LikedCards";
import UserContext from "../context/context";

const LikedPage = () => {
  const [likedCats, setLikedCats] = useState([]);
  const userData = useContext(UserContext);
  const userId = userData?.userData?.user?.id;

  useEffect(() => {
    const getLikedCats = async () => {
      const response = await axios.get(`/api/users/single/${userId}`);
      console.log("response", response);
      // console.log("userData", userData);
      // console.log("user id", userId);
      setLikedCats(response.data.data);
      console.log("likedCats", likedCats);
    };
    getLikedCats();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="h-screen container flex flex-wrap justify-around">
        {likedCats.map((cat) => {
          return <LikedCards cat={cat}/>;
        })}
      </div>
    </div>
  );
};

export default LikedPage;
