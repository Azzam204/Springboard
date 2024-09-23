class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const node = new Node(val)
    if (this.root === null) {
      this.root = node
    }

    else {
      let currentNode = this.root

      while (currentNode) {


        if (node.val < currentNode.val) {
          if (currentNode.left === null) {
            node.left = currentNode.left
            currentNode.left = node
            return this
          }
          currentNode = currentNode.left
        }
        else {
          if (currentNode.right === null) {
            node.right = currentNode.right
            currentNode.right = node
            return this
          }
          currentNode = currentNode.right
        }


      }
    }

    return this
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const node = new Node(val)

    function insertHelper(currentNode) {

      if (node.val < currentNode.val) {
        if (currentNode.left === null) {
          node.left = currentNode.left
          currentNode.left = node
          return
        }
        insertHelper(currentNode.left)
      }
      else {
        if (currentNode.right === null) {
          node.right = currentNode.right
          currentNode.right = node
          return
        }
        insertHelper(currentNode.right)
      }
    }

    if (this.root === null) {
      this.root = node
      return this
    }

    insertHelper(this.root)

    return this

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let currentNode = this.root

    while (currentNode) {

      if (currentNode.val ==  val) return currentNode

      if (currentNode.val > val) {
        currentNode = currentNode.left
      }
      else currentNode = currentNode.right
    }

    return undefined
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {

    let ans = undefined

    function findHelper(currentNode) {

      if (currentNode.val === val) {
        ans = currentNode
        return
      } 


      if (currentNode.val > val) {
        if (currentNode.left) findHelper(currentNode.left)
      }
      else if(currentNode.right) findHelper(currentNode.right)

    }

    findHelper(this.root)

    return ans
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let ans = []

    function preOrderTraverse(currentNode) {
      ans.push(currentNode.val)
      if (currentNode.left) preOrderTraverse(currentNode.left)
      if (currentNode.right) preOrderTraverse(currentNode.right)
    }
    
    preOrderTraverse(this.root)

    return ans
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let ans = []

    function preOrderTraverse(currentNode) {
      if (currentNode.left) preOrderTraverse(currentNode.left)
      ans.push(currentNode.val)
      if (currentNode.right) preOrderTraverse(currentNode.right)
    }

    preOrderTraverse(this.root)

    return ans
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let ans = []

    function preOrderTraverse(currentNode) {
      
      if (currentNode.left) preOrderTraverse(currentNode.left)
      if (currentNode.right) preOrderTraverse(currentNode.right)
      
      ans.push(currentNode.val)
    }

    preOrderTraverse(this.root)

    return ans
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let ans = [this.root.val]

    let toVisitQueue = []

    function bfsHelper(currentNode) {

      if (currentNode.left) {
        ans.push(currentNode.left.val)
        toVisitQueue.push(currentNode.left)
      }
      if (currentNode.right) {
        ans.push(currentNode.right.val)
        toVisitQueue.push(currentNode.right)
      }

      if (!toVisitQueue.length) return

      bfsHelper(toVisitQueue.shift())

    }

    bfsHelper(this.root)

    console.log(ans)

    return ans
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
