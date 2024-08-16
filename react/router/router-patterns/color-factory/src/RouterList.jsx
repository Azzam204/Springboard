import {React, useState} from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import ColorList from "./ColorList";
import ColorForm from "./ColorForm";
import Color from "./Color";
import {v4 as uuid} from 'uuid'

function RouterList() {
  const [colors, setColors] = useState([
    {
      name: "Red",
      value: "red",
      id: uuid()
    }
  ])

  const addColor = color => {
    let newColor = { ...color, id: uuid() }
    setColors(colors => [...colors,newColor])
  }
  
  return (
    <Routes>
      <Route
        path="/colors"
        element={<ColorList colors={colors} />}
      />

      <Route
        path="/colors/new"
        element={<ColorForm addColor={addColor} />}
      />

      <Route
        path="/colors/:color"
        element={<Color colors={colors} />}
      />

      <Route
        path="/*"
        element= {<Navigate to='/colors' />}
      />
    </Routes>
  )
}

export default RouterList