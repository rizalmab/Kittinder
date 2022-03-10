import React from "react";
import DatingCard from "react-tinder-card";

const LikedCards = (props) => {
  return (
    <div className="m-3">
      <DatingCard className="">
        <div
          style={{ backgroundImage: `url(${props.cat.imgUrl})` }}
          className="card relative bg-white p-5 bg-cover bg-center w-80 h-80 rounded-md shadow-vxl"
        >
          <h3 className="absolute bottom-0 m-2 text-white">{props.cat.name}</h3>
        </div>
      </DatingCard>
    </div>
  );
};

export default LikedCards;
