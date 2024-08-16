import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DogDetails({ dogs }) {
  const navigate = useNavigate()
  const param = useParams()
  const { name, src, age, facts } = dogs.find(dog => dog.name.toLowerCase() === param.name.toLowerCase())
  
  function back(evt) {
    evt.preventDefault();
    navigate("/");
  }
  return (
    <div className="Dog">
      <img src={src} alt="" />
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <li>Facts: {facts}</li>
      </ul>

      <button onClick={back}>
        Back
      </button>
    </div>
  )
}

export default DogDetails;