// add whatever parameters you deem necessary

function numFreq(num) {
  let obj = {}

  const strArr = num.toString().split('')

  for (let number of strArr) {
    obj[number] = (obj[number] + 1) || 1
  }

  return [obj, strArr.length]

}


function sameFrequency(num1, num2) {

  const [freqNum1, lenNum1] = numFreq(num1)
  const [freqNum2, lenNum2] = numFreq(num2)

  if (lenNum1 !== lenNum2) return false

  for (let key in freqNum1) {
    if (freqNum1[key] !== freqNum2[key]) return false
  }

  return true

}
