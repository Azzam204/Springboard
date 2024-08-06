import React from "react";
import { Link } from "react-router-dom";
import filter from './assets/filter.png'

function OilFilter() {
  return (
    <div className="OilFilter">
      <div>
        <h1>Oil Filter</h1>
        <Link to='/'>Go Back</Link>
      </div>
      <div>
        <img src={filter} alt="" />
      </div>
    </div>
  )
}

export default OilFilter;