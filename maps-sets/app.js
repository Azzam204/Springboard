// Quick Question #1
// what does the following code return?

new Set([1,1,2,2,3,4])

// answer
{1,2,3,4}

// Quick Question #2
// what does the following code return?

[...new Set("referee")].join("")

// answer
"ref"

// Quick Question #3
// what does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

// answer
[[[1,2,3] , true], [[1,2,3], false]]

// hasDuplicate
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

// answer 

const hasDuplicate = arr => arr.length === new Set(arr).size ? true : false

// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt') // Map { 'o' => 1 }

// answer

const vowelCount = string => {
    const strMap = new Map();
    const strSet = new Set(string);
    const vowels = 'aeiou';
    [...strSet].forEach(val => strMap.set(val , 0));
    for (let letter of string) {
        strMap.set(letter, strMap.get(letter) + 1)
    }
    strMap.forEach((val,key) => {
        if (vowels.indexOf(key) === -1) {
            strMap.delete(key) }});
    return strMap
}
