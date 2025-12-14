import { Node } from './node-class.js';
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  buildTree(arr) {
    if (arr.length < 1) {
      return null;
    }

    const sorted = [...new Set(arr)].sort((a, b) => a - b);
    let mid = Math.floor(sorted.length / 2);

    const root = new Node(sorted[mid]);

    root.left = this.buildTree(sorted.slice(0, mid));
    root.right = this.buildTree(sorted.slice(mid + 1));

    return root;
  }
}

const tree = new BinarySearchTree();
console.log((tree.root = tree.buildTree([1, 4, 2, 5, 6])));
