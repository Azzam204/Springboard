import React from "react";
import { Link } from "react-router-dom";


function DogList({ dogs }) {

  return (
    <div className="DogList">
      <h1>Dogs!</h1>
      {dogs.map(dog => (
        <div key={dog.name} className="Dog">
          <Link to={`/dogs/${dog.name}`} ><img src={dog.src} alt="" /></Link>
          <p><Link to={`/dogs/${dog.name}`}>{dog.name}</Link></p>
        </div>
      ))}
    </div>
  )
}

export default DogList