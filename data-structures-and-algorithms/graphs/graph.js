class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    // for (let vert of vertexArray) this.addVertex(vert)
    vertexArray.forEach((vert) => this.addVertex(vert))
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)

    this.nodes.forEach((node) => {
      node.adjacent.delete(vertex)
    })
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let ans = [start.value]
    let toVisit = [start]
    let seen = new Set(toVisit)
    
    function dfsHelper(curr) {
      if (toVisit.length === 0) return

      curr.adjacent.forEach((adj) => {
        if (!seen.has(adj)) {
          toVisit.push(adj)
          seen.add(adj)
          ans.push(adj.value)
          dfsHelper(toVisit.pop())
        }
      })

      

    }

    dfsHelper(start)

    console.log(ans)

    return ans
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let ans = [start.value]
    let toVisit = [start]
    let seen = new Set(toVisit)

    function bfsHelper(curr) {
      if (toVisit.length === 0) return

      curr.adjacent.forEach((adj) => {
        if (!seen.has(adj)) {
          toVisit.push(adj)
          seen.add(adj)
          ans.push(adj.value)
        }
      })

      bfsHelper(toVisit.shift())

    }

    bfsHelper(start)


    return ans
}
}

module.exports = {Graph, Node}