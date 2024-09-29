// add whatever parameters you deem necessary

function isSubsequence(string1, string2) {
  if (string1.length > string2.length) return false

  let idx1 = 0
  let idx2 = 0

  let compStr = ''

  while (compStr.length < string1.length && idx2 < string2.length  ) {
    
    if (string1[idx1] === string2[idx2]) {
      compStr += string2[idx2]
      idx1 ++
      idx2++
    }
    else {
      idx2 ++
    }
  }

  return string1 === compStr
}