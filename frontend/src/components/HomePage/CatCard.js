import React, { useState, useEffect } from "react";
import DatingCard from "react-tinder-card";
import axios from "../axios";

const CatCard = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/cats");
      // console.log("response", response.data);
      setCats(response?.data);
    };
    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("receiving ", nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen!");
  };

  return (
    <div className="datingCards">
      <div className="container flex justify-center mt-10">
        {cats.map((cat) => {
          return ( 
            <DatingCard
              className="absolute"
              key={cat.name}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, cat.name)}
              onCardLeftScreen={() => outOfFrame(cat.name)}
            >
              <div
                style={{ backgroundImage: `url(${cat.imgUrl})` }}
                className="relative bg-white p-5 bg-cover bg-center w-96 h-96 rounded-md shadow-vxl"
              >
                <h3 className="absolute bottom-0 m-2 text-white">{cat.name}</h3>
              </div>
            </DatingCard>
          );
        })}
      </div>
    </div>
  );
};

export default CatCard;
