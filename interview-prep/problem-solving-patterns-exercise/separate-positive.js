// // add whatever parameters you deem necessary
function separatePositive(arr) {
  let left = 0;
  let right = arr.length - 1
  let mid = Math.floor(arr.length / 2)

  while (left < right) {
    let temp = arr[mid]
    arr.splice(mid, 1)

    if (temp > 0) {
      arr.unshift(temp)

      left++
    }

    else {
      arr.push(temp)

      right --
    }
  }

  return arr
}

// function separatePositive(arr) {
//   let idx = 0

//   while (idx < arr.length -1) {
//     if (arr[idx] < 0) {
//       let temp = arr[idx]
//       arr.splice(idx, 1)
//       arr.push(temp)
//     }
//     idx ++
//   }
//   return arr
// }
