/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0

    let toVisitStack = [this.root];

    let minDepth = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      for (let node of toVisitStack) {
        if (!node.left || !node.right) return minDepth + 1
      }

      minDepth++

      toVisitStack.push(current.left)
      toVisitStack.push(current.right)

    }

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0

    let toVisitStack = [this.root];

    let maxDepth = 1;

    while (toVisitStack.length) {

      let current = toVisitStack.pop()

      if (current.left || current.right) {
        toVisitStack.push(current.left)
        toVisitStack.push(current.right)
        maxDepth++
      }

    }
    return maxDepth
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let maxSum = 0;

    function findMaxSum(node) {
      if (node === null) return 0;

      const leftSum = findMaxSum(node.left);
      const rightSum = findMaxSum(node.right);

      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

      return Math.max(0, leftSum + node.val, rightSum + node.val);
    };

    findMaxSum(this.root);

    return maxSum;

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null

    let nextLarger = Infinity

    function findNextLarger(node) {
      if (node.val > lowerBound && node.val < nextLarger) nextLarger = node.val

      if (node.left !== null) {
        if (node.val > lowerBound && node.val < nextLarger) nextLarger = node.val

        findNextLarger(node.left)
        findNextLarger(node.right)
      }

      if (node.right !== null) {
        if (node.val > lowerBound && node.val < nextLarger) nextLarger = node.val

        findNextLarger(node.left)
        findNextLarger(node.right)
      }
    }

    findNextLarger(this.root)

    if (nextLarger === Infinity) return null
    
    return nextLarger
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
