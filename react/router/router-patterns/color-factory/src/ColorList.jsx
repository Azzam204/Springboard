import React from "react";
import { Link } from "react-router-dom";


function ColorList({colors}) {
  return (
    <div>
      <div>
        <h2>Welcome to the color factory.</h2>
        <h1>
          <Link to='/colors/new'>Add a color</Link>
        </h1>
      </div>
      <div>
        <p>Please select a color.</p>
        {colors.map(color => (
          <div>
            <Link to={`/colors/${color.name}`} key={color.id}>{color.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorList