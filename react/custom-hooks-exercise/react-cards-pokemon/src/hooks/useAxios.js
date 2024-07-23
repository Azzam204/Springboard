import { useState } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";

function useAxios(baseUrl) {
  const [cards, setCards] = useState([]);
  async function addCard (addOn = '') {
    const response = await axios.get(baseUrl+addOn);
    setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  };
  return [cards, addCard]
}

export default useAxios;