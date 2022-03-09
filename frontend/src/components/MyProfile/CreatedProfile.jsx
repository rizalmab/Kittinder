import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreatedProfile = () => {
  const navigate = useNavigate();
  const [myCat, setMyCat] = useState({});
  const { id } = useParams();

  const handleDelete = async () => {
    // axios delete call
    const response = await axios.delete(`/api/cats/${id}`);
    console.log("response", response);
    // navigate to home page
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/cats/show/${id}`);
      // console.log("responseCreatedProfile", response.data.data);
      setMyCat(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="text-black">
      <div className="main-container flex p-20 h-screen">
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <img src={myCat.imgUrl} alt="cat" />
        </div>
        <div className="container mx-auto inline-block w-1/2 h-4/5 border-2 border-solid">
          <div className="container mx-auto">
            <p>Cat Name: {myCat.name} </p>
            <p>Gender: {myCat.gender}</p>
            <p>Age: {myCat.age ? myCat.age : "Not mentioned"}</p>
            <p>Breed: {myCat.breed ? myCat.breed : "Not mentioned"}</p>
          </div>
          <div className="container mx-auto flex justify-center">
            <button className="bg-blue-700 text-white rounded-md px-3 py-1 m-3">
              Edit
            </button>
            <button
              className="bg-red-700 text-white rounded-md px-3 py-1 m-3"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedProfile;
