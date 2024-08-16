import React from 'react';
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import './App.css';
import whiskey from './assets/whiskey.jpg'
import duke from './assets/duke.jpg'
import perry from './assets/perry.jpg'
import DogList from './DogList';
import DogDetails from './DogDetails';

function App() {
  const dogs = [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    }
  ]
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/dogs" element={<DogList dogs={dogs} />} />
        <Route path="/dogs/:name" element={<DogDetails dogs={dogs} />} />
        <Route path='*' element={<Navigate to="/dogs" />} />
      </Switch>
    </div>
  );
}





export default App;
