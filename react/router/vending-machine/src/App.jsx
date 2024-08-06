import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Soda from './Soda'
import OilFilter from './OilFilter'
import ToiletPaper from './ToiletPaper'
import VendingMachine from './VendingMachine'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/soda' element={<Soda />} />
          <Route path='/oilfilter' element={<OilFilter />} />
          <Route path='/toiletpaper' element={<ToiletPaper />} />
          <Route path='/' element={<VendingMachine />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
