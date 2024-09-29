// add whatever parameters you deem necessary
function letterFreq(str) {
  const obj = {}

  for (let letter of str) {
    obj[letter] = (obj[letter] + 1) || 1
  }

  return obj
}

function constructNote(msg, letters) {
  if (msg.length > letters.length) return false

  const msgObj = letterFreq(msg)
  const letObj = letterFreq(letters)

  for (let letter in msgObj) {
    if (msgObj[letter] > letObj[letter]) return false
  }

  return true
}
