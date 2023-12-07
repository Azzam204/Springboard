function countZeroes(arr) {
  let leftIdx = 0;
  let rightIdx = arr.length-1;
  
  while(leftIdx < rightIdx){

    let middleIdx = Math.floor((leftIdx + rightIdx)/2);
    let midVal = arr[middleIdx];

    if (arr[leftIdx] == 1 && arr[rightIdx] == 0){
        if (rightIdx - leftIdx == 1){
            return arr.length - rightIdx
        }
        else if (midVal == 1) {
            leftIdx = middleIdx;
        }
        else{
            rightIdx = middleIdx;
        }
    }
    else if (arr[leftIdx] == 0 && arr[rightIdx] == 0) {
        return arr.length - leftIdx
    }
    else{
        return 0
    }
  }
}

module.exports = countZeroes


// l         r
//     m
//       l   r 
//         m
//       l r 
// 1 1 1 1 0 0