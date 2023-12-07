function findRotationCount(arr,left = 0, right = arr.length -1) {
    if ((right === left + 1) && (arr[right] < arr[left])) return right;
    if ((right === left + 1) && (arr[right] > arr[left])) return 0;
    if (right > left){
        let midIdx = Math.floor((right + left)/2);
        if (arr[midIdx] > arr[left]){
            return findRotationCount(arr,midIdx,right)
        }
        else{
            return findRotationCount(arr,left,midIdx)
        }
    } 
}


module.exports = findRotationCount

l             r
      m

7 8 1 2 3 4 5 6