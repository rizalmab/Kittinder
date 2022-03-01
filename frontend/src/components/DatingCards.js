import React, { useState } from "react";
import DatingCard from "react-tinder-card";

const cardContent = "w-full h-full";

const DatingCards = () => {
  const [cats, setCats] = useState([
    { name: "Tabbie1", imgUrl: "https://i.imgur.com/Ad76TQv.jpg" },
    { name: "Tabbie2", imgUrl: "https://i.imgur.com/K9VUOYo.jpg" },
  ]);

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

export default DatingCards;
