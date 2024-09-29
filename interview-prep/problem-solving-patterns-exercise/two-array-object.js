// add whatever parameters you deem necessary
function twoArrayObject(keys,vals) {
  let idx = 0
  let obj = {}

  while (idx <= keys.length - 1) {
    obj[keys[idx]] = vals[idx] || null

    idx ++ 
  }

  return obj
}
