function merge(arrA, arrB) {
  const ans = []
  let a = 0;
  let b = 0;
  while (a < arrA.length && b < arrB.length) {
    if (arrA[a] < arrB[b]) {
      ans.push(arrA[a]);
      a++;
    }
    else {
      ans.push(arrB[b]);
      b++
    }
  }
  while (a < arrA.length) {
    ans.push(arrA[a])
    a++;
  }
  while (b < arrB.length) {
    ans.push(arrB[b])
    b++;
  }

  return ans
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const a = mergeSort(arr.slice(0, mid));
  const b = mergeSort(arr.slice(mid))
  return merge(a,b)
}

module.exports = { merge, mergeSort };