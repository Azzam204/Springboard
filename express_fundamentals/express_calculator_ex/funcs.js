function mean(arr) {
    let ans = 0;
    for (let num of arr) {
        ans += num
    };

    return ans/arr.length
}

function median(arr) {
    const len = arr.length;
    const sorted = arr.sort()
    if (len % 2 === 0) {
        return (sorted[(len/2)-1] + sorted[len/2]) /2
    }

    else{
        return sorted[Math.floor(len/2)]
    }
}

function mode(arr) {
    const sorted = arr.sort();
    let count = 1;
    let maxCount = 1;
    let curAns = sorted[0] ;
    for (let i = 0; i < arr.length; i++) {
        if(sorted[i] == sorted[i+1]) {
            count ++;
            if (count > maxCount) {
                maxCount = count;
                count = 1;
                curAns = sorted[i]
            }
        }
        else count = 1;
    }
    return curAns
}

function strToArr(str) {
    const strArr = str.split(',');
    const arr = [];
    
    for (let i = 0; i < strArr.length; i++) {
        if(parseInt(strArr[i])) arr.push(parseInt(strArr[i]))

        else {
        return strArr[i]
        }
    }
    return arr
}

module.exports = {mean,median,mode,strToArr};