import React from "react";
import { Link } from 'react-router-dom'
import vending from './assets/vending.png'

function VendingMachine() {
  return (
    <>
      <h1>Vending Machine</h1>
      <div className="VendingMachine">
        <div>
          <Link to='/soda'>Soda</Link>
        </div>
        <div>
          <Link to='/oilfilter'>Oil Filter</Link>
        </div>
        <div>
          <Link to='/toiletpaper'>Toilet Paper</Link>
        </div>
        <img src={vending} alt="" className="vending" />
      </div>
    </>
  )
}

export default VendingMachine