function findFloor(arr,val,left= 0, right = arr.length -1) {
    let midIdx = Math.floor((left+right)/2);
    if (arr[arr.length-1] < val) return arr[arr.length-1];
    if (arr[0] > val) return - 1;
    if (right === (left + 1)) return arr[left];
    if (arr[midIdx] > val){
        return findFloor(arr,val,left,midIdx)
    }
    else {
        return findFloor(arr,val,midIdx,right)
    }
}

module.exports = findFloor