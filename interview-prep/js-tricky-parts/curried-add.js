function curriedAdd(total) {
  if (total === undefined) return 0
  return function addHelper (num) {
    if (num === undefined) return total
    total += num
    return addHelper
  }
}

module.exports = { curriedAdd };
