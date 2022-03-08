import React from "react";

const CreatedProfile = (props) => {
  // incl edit button
  // incl delete button
  // show cat picture and all details
  console.log("props", props);

  return (
    <div className="text-black">
      <div className="main-container flex p-20 h-screen">
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <img src={props.createdCat.imgUrl} alt="cat" />
        </div>
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <div className="container mx-auto">
            <p>Cat Name: {props.createdCat.name} </p>
            <p>Gender: {props.createdCat.gender}</p>
            <p>
              Age:{" "}
              {props.createdCat.age ? props.createdCat.age : "Not mentioned"}
            </p>
            <p>
              Breed:{" "}
              {props.createdCat.breed
                ? props.createdCat.breed
                : "Not mentioned"}
            </p>
          </div>
          <div className="container mx-auto flex justify-center">
            <button className="bg-blue-700 text-white rounded-md px-3 py-1 m-3">
              Edit
            </button>
            <button className="bg-red-700 text-white rounded-md px-3 py-1 m-3">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedProfile;
