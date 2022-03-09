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
  // const [profileMade, setProfileMade] = useState(false);
  // const profileMadeRef = useRef(false);
  // console.log("profileMadeRef", profileMadeRef.current);
  const [createdCat, setCreatedCat] = useState({});

  const navigate = useNavigate();

  const userDetails = useContext(UserContext);
  // console.log("userId", userDetails.userData.user.id);
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
        // setProfileMade(true);
        // profileMadeRef.current = true;
        setCreatedCat(newCat);
        console.log("response", response);
        console.log("createdCat", createdCat);
        navigate(`/created-profile/${response.data.data._id}`);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    createProfile();
  };

  // const getRandomCat = async () => {
  //   const randomCat = await axios.get("https://cataas.com/cat");
  //   console.log("randomCat", randomCat);
  // };

  console.log(catName, imgUrl, gender, age, breed);

  return (
    <div className="text-black">
      <div className="main-container flex p-20 h-screen">
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          Img uploader
        </div>
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>
                Cat Name
                <RedAsterisk />:
              </label>
              <input
                type="text"
                required
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>
                ImgUrl
                <RedAsterisk />:
              </label>
              <input type="text" onChange={(e) => setImgUrl(e.target.value)} />
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
              <input type="number" onChange={(e) => setAge(e.target.value)} />
            </div>
            <br />
            <div>
              <label>Breed:</label>
              <input type="text" onChange={(e) => setBreed(e.target.value)} />
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
