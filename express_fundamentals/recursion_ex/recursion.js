/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0 ) return 1;

  return nums[0] * product(nums.slice(1))
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) return 0;

  return Math.max(words[0].length,longest(words.slice(1)))
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 2 ) return str[0];
  
  return str[0] + everyOther(str.slice(2))
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) return true;

  if (str[0] !== str[str.length-1]) return false
  
  return isPalindrome(str.slice(1,-1))
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  if (arr[0] === val) return idx;
  if (arr.length === 0) return -1
  return findIndex(arr.slice(1),val,idx + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if(str.length === 1) return str[0]

  return str[str.length - 1] + revString(str.slice(0,-1))
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, out=[]) {
  for(let k in obj) {
    if (typeof obj[k] === 'object') {
      gatherStrings(obj[k],out);
    }
    else if (typeof obj[k] === 'string') {
      out.push(obj[k])
    }
  }
  return out
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val,left = 0,right =arr.length -1,mid = Math.floor((left + right) / 2)) {
  if(right < left) return -1
  if (arr[mid] < val) return binarySearch(arr,val,mid+1);
  else if(arr[mid] > val) return binarySearch(arr,val,left,mid-1);
  else {
    return mid
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
