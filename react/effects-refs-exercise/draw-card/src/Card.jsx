import React from "react";


function Card({ src, z, angle }) {

  const style = {
    transform: `rotateZ(${angle}deg)`,
    zIndex : z
  }

  return (
    <img
      className="Card"
      src={src}
      style={style}
    />
  )
}

export default Card