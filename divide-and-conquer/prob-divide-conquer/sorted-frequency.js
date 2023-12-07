function sortedFrequency(arr,val) {
    if(firstIdx(arr,val) === -1 ) return -1
    return (lastIdx(arr,val) - firstIdx(arr,val)) + 1
}

function firstIdx(arr,val, left = 0, right = arr.length -1) {
    if( right !== left + 1 ) {
        let midIdx = Math.floor((right + left)/2);
        if (arr[left] === val) return left
        if (arr[left] > val || arr[right] < val ) return -1;
        if( arr[midIdx] < val) {
            return firstIdx(arr,val,midIdx,right)
        }

        if ( arr[midIdx] >= val) {
            return firstIdx(arr,val,left,midIdx)
        }
    }
    return right
}

function lastIdx(arr,val,left = 0, right = arr.length -1){
    if ( right !== left + 1){
        let midIdx = Math.floor((right + left)/2);
        if (arr[right] === val) return right;
        if (arr[left] > val || arr[right] < val ) return -1;
        if (arr[midIdx] > val) {
            return lastIdx(arr,val,left,midIdx)
        }
        if (arr[midIdx] <= val){
            return lastIdx(arr,val,midIdx,right)
        }
    }
    return left
}

module.exports = sortedFrequency
