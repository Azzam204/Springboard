import React from "react";
import { Link } from "react-router-dom";
import soda from './assets/soda.png'

function Soda() {
  return (
    <div className="Soda">
      <div>
        <h1>Soda</h1>
        <Link to='/'>Go Back</Link>
      </div>
      <div>
        <img src={soda}/>
      </div>
    </div>
  )
}

export default Soda;