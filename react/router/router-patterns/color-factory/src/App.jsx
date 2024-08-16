import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RouterList from './RouterList'

function App() {

  return (
    <div>
      <BrowserRouter>
        <RouterList />
      </BrowserRouter>
    </div>
  )
}

export default App
