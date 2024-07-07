import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import './App.css'

function Stack() {
  const [shuffled,setShuffled] = useState(true)
  const [deckId, setDeckId] = useState(null);
  const [stack, setStack] = useState([]);

  useEffect(function fetchDeckIdWhenmounted() {
    async function fetchDeckId () {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckId(res.data.deck_id)
    }

    fetchDeckId();

  }, [shuffled]);

  const angle = () => Math.floor(Math.random() * (45 - (-45)) + (-45))

  async function drawCard() {
    try {
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);

      const newCard = {
        id: uuid(),
        img: res.data.cards[0].image,
        angle: angle()
      }
      
      console.log(res.data.remaining)

      setStack([...stack, newCard])
      
    } catch (e) {
      alert("Error:no cards remaining")
    }
  };

  function shuffle() {
    setStack([]);
    setShuffled(!shuffled)
  }

  return (
    <>
      <div>
        <button onClick={drawCard}>GIMME A CARD!</button>
      </div>
      <div className='shuffle'>
        {stack.length > 0 &&
          <button onClick={shuffle}>shuffle deck</button>
        }
      </div>
      <div className='Stack'>
        {stack.map((card,idx) => (
          <Card
            key={card.id}
            src={card.img}
            z={idx}
            angle={card.angle}
          />
        ))}
      </div>
    </>
  )

}

export default Stack