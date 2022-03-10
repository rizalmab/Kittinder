import React, { useState, useContext, useRef } from "react";
import RedAsterisk from "../misc/RedAsterisk";
import axios from "axios";
import UserContext from "../context/context";
import CreatedProfile from "./CreatedProfile";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [catName, setCatName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(undefined);
  const [breed, setBreed] = useState(undefined);
  // const profileMadeRef = useRef(false);
  // console.log("profileMadeRef", profileMadeRef.current);
  const [createdCat, setCreatedCat] = useState({});

  const navigate = useNavigate();

  // Global context
  const userDetails = useContext(UserContext);
  const profileMade = userDetails.profileMade;
  console.log("userDetails", userDetails);
  console.log("userDetails - setProfileMade()", userDetails.setProfileMade);
  const userId = userDetails.userData.user.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // make a post request
    const createProfile = async () => {
      console.log("create profile");
      try {
        const newCat = {
          name: catName,
          imgUrl: imgUrl,
          gender: gender,
          age: age,
          breed: breed,
          user: { userId: userId },
        };
        const response = await axios.post("/api/cats/new", newCat);
        setCreatedCat(newCat);
        userDetails.setProfileMade(true);
        // console.log("profileMade", userDetails.profileMade);
        // console.log("response", response);
        // console.log("createdCat", createdCat);
        userDetails.setProfileId(response.data.data._id)
        navigate(`/created-profile/${response.data.data._id}`);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    createProfile();
  };

  console.log(catName, imgUrl, gender, age, breed);

  return (
    <div className="text-black">
      <div className="main-container flex p-20 h-screen">
        <div className="container mx-auto flex justify-center w-1/2 h-4/5 border-2 border-solid rounded-lg">
          {/* Img uploader */}
          <img alt="cat" src={imgUrl} />
        </div>
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid p-10 rounded-lg">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>
                Cat Name
                <RedAsterisk />:
              </label>
              <input
                type="text"
                required
                className="rounded-lg"
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>
                ImgUrl
                <RedAsterisk />:
              </label>
              <input
                type="text"
                className="rounded-lg"
                onChange={(e) => setImgUrl(e.target.value)}
              />
              {/* <button className="bg-red-600" onClick={() => getRandomCat()}>
                Get random cat image
              </button> */}
            </div>
            <br />
            <div>
              <label>
                Gender
                <RedAsterisk />:
              </label>
              <select
                name="gender"
                id="gender"
                className="rounded-lg"
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <br />
            <div>
              <label>Age:</label>
              <input
                type="number"
                className="rounded-lg"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>Breed:</label>
              <input
                type="text"
                className="rounded-lg"
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <br />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
