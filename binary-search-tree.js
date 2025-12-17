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

  insert(value) {
    if (typeof value !== 'number' || value < 0) {
      return 'You can only insert positive integers.';
    }
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let curr = this.root;

    while (true) {
      if (curr.value > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.value < value && curr.right !== null) {
        curr = curr.right;
      } else {
        break;
      }
    }

    if (curr.value > value) {
      curr.left = newNode;
    } else {
      curr.right = newNode;
    }
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  delete(root, value) {
    if (root === null) {
      return root;
    }

    if (root.value > value) {
      root.left = this.delete(root.left, value);
    } else if (root.value < value) {
      root.right = this.delete(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      const succ = this.getSuccessor(root);
      root.value = succ.value;
      root.right = this.delete(root.right, succ.value);
    }
    return root;
  }
}

const tree = new BinarySearchTree();

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

tree.insert(5);
tree.insert(2);
tree.insert(1);
tree.insert(6);
tree.insert(4);
tree.insert(3);
tree.delete(tree.root, 2);

prettyPrint(tree.root);
