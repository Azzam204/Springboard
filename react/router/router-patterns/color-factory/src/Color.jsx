import React from "react";
import { useParams, useNavigate } from "react-router-dom";


function Color({ colors }) {
  const { color } = useParams()
  const { name, value } = colors.find(c => c.name.toLowerCase() === color.toLowerCase())

  const navigate = useNavigate()

  function back(evt) {
    evt.preventDefault();
    navigate("/");
  }

  return (
    <div className="Color" style={{backgroundColor:value}}>
      <h1>{name}</h1>
      <h1>is a beatiful color!</h1>
      <button onClick={back}>back</button>
    </div>
  )
}

export default Color