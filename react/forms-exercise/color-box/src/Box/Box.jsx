import React from "react";
import '../App.css'

function Box({ color, height, width, delBox }) {

  return (
    <>
      <div
        className="Box"
        style={{
          backgroundColor: color,
          height: `${height}px`,
          width: `${width}px`
        }}
      >
      </div>
      <button onClick={delBox}>x</button>
    </>
  )
}

export default Box