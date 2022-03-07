import React from "react";
import RedAsterisk from "../misc/RedAsterisk";

const MyProfile = () => {
  const handleSubmit = () => {
    console.log("Form submitted");
    // make a post request 
  };

  return (
    <div className="text-black">
      <div className="main-container flex p-20 h-screen">
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          Img uploader
        </div>
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Cat Name
                <RedAsterisk />:
              </label>
              <input type="text" required />
            </div>
            <br />
            <div>
              <label>
                ImgUrl
                <RedAsterisk />:
              </label>
              <input type="text" />
            </div>
            <br />
            <div>
              <label>
                Gender
                <RedAsterisk />:
              </label>
              <input type="text" />
            </div>
            <br />
            <div>
              <label>Age:</label>
              <input type="number" />
            </div>
            <br />
            <div>
              <label>Breed:</label>
              <input type="text" />
            </div>
            <br />
            <button className="bg-red-700">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
