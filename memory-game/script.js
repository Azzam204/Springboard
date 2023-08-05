let highestScore = document.querySelector('#highscore');

if (localStorage.highScore) {
  highestScore.innerText = localStorage.highScore;
}
const gameContainer = document.getElementById("game");
const highScore = highestScore.innerText.slice(11);
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let tries = document.querySelector('#tries');



let pickedCards = undefined;
let cardAmount = 0
let counter = 0;
let flipped = 0;


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const color = event.target.className;
  const card = event.target;
  if (cardAmount <= 2){
    cardAmount ++;
    if (pickedCards !== undefined) {
      if (pickedCards !== card) {
        if(card.className === pickedCards.className) {
          counter ++;
          cardAmount = 0;
          card.style.backgroundColor = color;
          card.removeEventListener('click',handleCardClick);
          pickedCards.removeEventListener('click',handleCardClick);
          flipped += 2;
          pickedCards = undefined;
        }
        else if (card.className !== pickedCards.className) {
          counter++;
          cardAmount ++;
          card.style.backgroundColor = color;
          setTimeout(function(){
            card.style.backgroundColor = ('blanchedalmond');
            pickedCards.style.backgroundColor = ('blanchedalmond');
            pickedCards = undefined;
            cardAmount = 0;
          },1000)
        }
      }
    }
    else {
      card.style.backgroundColor = color;
      pickedCards = card;
    }
  }
  if (flipped === COLORS.length) {
    setTimeout(function(){
      if (parseInt(highScore) > counter || highScore === ''){
        localStorage.setItem('highScore', `High Score: ${counter}` );
      }
      alert (`CONGRATS! you got it in ${counter} tries`);
      location.reload();
    },500)
  }
}



// when the DOM loads
createDivsForColors(shuffledColors);
const allCards = document.querySelectorAll('div div');

setInterval(function(e){
  tries.innerText = (`Tries: ${counter}`)
},100);



  // if (pickedCards.length < 2) {
  // event.target.style.backgroundColor = (color);
  // pickedCards.push(card);
  // }
  // else if (pickedCards[0].className !== pickedCards[1].className) {
  //   for (let cards of allCards){
  //     if(pickedCards.indexOf(cards) !== -1){
  //       cards.style.backgroundColor = ('white');
  //     }
  //   }pickedCards = [];
  // }
  // else {
  //   pickedCards = [];
  // }