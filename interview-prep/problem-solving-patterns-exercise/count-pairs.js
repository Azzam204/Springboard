// add whatever parameters you deem necessary
function countPairs(arr,num) {
  let idx = 0
  let idx2 = 1

  let ans = 0

  while (idx < arr.length - 1) {
    let seeking = num - arr[idx]

    console.log('currently checking', arr[idx], arr[idx2])

    if (arr[idx2] === seeking) {
      console.log('pair',arr[idx],seeking)
      ans++ 
      idx++
      idx2 = idx + 1
    }

    else if (idx2 > arr.length - 1) {
      idx++
      idx2 = idx + 1
    }

    else {
      idx2 ++
    }
    
  }
  
  return ans
}
