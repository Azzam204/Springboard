/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chainMap = new Map()

    this.words.forEach((word,i,arr) => {

      if (chainMap.get(word)) chainMap.get(word).push(arr[i+1] || null)

      else chainMap.set(word,[arr[i+1] || null])
    });

    this.chainMap = chainMap 
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let randI = (arr) => Math.floor(Math.random() * arr.length)
    let text = [];
    let keyArr = Array.from(this.chainMap.keys())
    let currKey = keyArr[randI(keyArr)]
    
    while( text.length < numWords && currKey !== null) {
      text.push(currKey);
      currKey = this.chainMap.get(currKey)[randI(this.chainMap.get(currKey))]
    }

    return text.join(' ');
  }
}


module.exports = {
  MarkovMachine,
}