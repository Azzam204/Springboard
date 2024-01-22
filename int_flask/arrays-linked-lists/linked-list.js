/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length -1)
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0)
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0){
      throw new Error('Invalid entry');
    }
    return this.get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0){
      throw new Error('Invalid entry');
    }
    this.get(idx).val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0){
      throw new Error('Invalid entry');
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val)

    let prev = this.get(idx - 1);

    let newNode = new Node(val)
    newNode.next = prev.next;
    prev.next = newNode;

    this.length +=1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0){
      throw new Error('Invalid entry');
    }

    if (idx === 0) {
      let val = this.head;
      this.head = this.head.next;
      this.length -= 1;
      if(this.length < 2) this.tail = this.head;
      return val.val;
    }

    let prev = this.get(idx-1)    

    if (idx === this.length -1) {
      let val = prev.next
      this.tail = prev;
      this.tail.next = null;
      this.length -= 1;
      return val.val
    }



    let val = prev.next;
    prev.next = val.next;
    this.length -=1;
    return val.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.length === 0){
      return 0
    }
    let current = this.head
    let sum = 0;
    let count = 0;
    while (count < this.length){
      sum += current.val;
      count += 1;
      current = current.next
    }
    return sum/this.length;
  }

  get(idx){
    let current = this.head;
    let count = 0;

    while (count !== idx){
      count += 1;
      current = current.next
    }
    return current
  }
}

module.exports = LinkedList;
