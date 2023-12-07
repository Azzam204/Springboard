function findRotatedIndex(arr,val,left = 0, right = arr.length -1) {
    let rotIdx = findRotationCount(arr);
    if( val >= arr[rotIdx] && val <= arr[right]){
        left = rotIdx;
        while ( right >= left) {
            let midIdx = Math.floor((right + left)/2);
            let midVal = arr[midIdx]

            if (midVal < val) {
                left = midIdx + 1;
            }
            else if ( midVal > val){
                right = midIdx - 1;
            }
            else {
                return midIdx
            }
        }
        return -1
    }
    else if ( val <= arr[rotIdx-1] && val >= arr[left]){
        right = rotIdx - 1;
        while ( right >= left) {
            let midIdx = Math.floor((right + left)/2);
            let midVal = arr[midIdx];

            if (midVal < val) {
                left = midIdx + 1;
            }
            else if ( midVal > val){
                right = midIdx -1;
            }
            else { 
                return midIdx
            }
        }
        return -1
    }
    return -1
}



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

module.exports = findRotatedIndex


l                r
              x
37 44 66 102 10 22

l                    r
            x
            l        r
               m
6, 7, 8, 9, 1, 2, 3, 4