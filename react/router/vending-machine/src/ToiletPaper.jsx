import React from "react";
import { Link } from "react-router-dom";
import toilet from './assets/toilet.png'

function ToiletPaper() {
  return (
    <div className="ToiletPaper">
      <div>
        <h1>Toilet Paper</h1>
        <Link to='/'>Go Back</Link>
      </div>
      <div>
        <img src={toilet} alt="" />
      </div>
    </div>
  )
}

export default ToiletPaper;