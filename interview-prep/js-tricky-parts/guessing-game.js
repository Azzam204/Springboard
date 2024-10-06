function guessingGame() {
  let guesses = 0
  let solved = false
  let randNum = Math.floor(Math.random() * 100)
  
  function game(guess) {
    if (solved) return 'The game is over, you already won!'

    else if (guess === randNum) {
      guesses ++
      solved = true
      return `You win! You found ${randNum} in ${guesses} guesses.`
    }

    else {
      guesses ++
      if(guess < randNum) return `${guess} is too low!`
      return `${guess} is too high!`
    }

  }
  return game
}

module.exports = { guessingGame };
