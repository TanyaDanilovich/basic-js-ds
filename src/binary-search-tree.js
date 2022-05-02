const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor(val) {
		this.initialRoot = null;
		this.currentRoot = null;
		this.getMin;
		this.getMax;
	}
	root() {
		return this.initialRoot
	}

	add(data) {
		let newNode = new Node(data);
		if (this.getMin > data) {
			this.getMin = data;
		}
		if (this.getMax < data) {
			this.getMax = data;
		}
		if (this.initialRoot === null) {
			this.getMin = data;
			this.getMax = data;
			//console.log(this.getMin)
			this.initialRoot = newNode;
			this.currentRoot = newNode

		} else {
			insertNode(this.currentRoot, newNode); // helper method below
		}
		function insertNode(node, newNode) {
			if (newNode.data < node.data) {
				if (node.left === null) {
					node.left = newNode;
				} else {
					insertNode(node.left, newNode);
				}
			} else {
				if (node.right === null) {
					node.right = newNode;
				} else {
					insertNode(node.right, newNode);
				}
			}
		}
	}

	has(data) {
		return (this.find(data)) ? true : false
	}

	find(data) {
		let current = this.currentRoot;
		while (current !== null) {
			if (current.data === data) {
				return current
			} else if (data < current.data) {
				current = current.left
			} else {
				current = current.right
			}
		}
		return null
	}

	remove(data) {
		this.currentRoot = removeNode(this.currentRoot, data); // helper method below
		// находит минимальный узел в дереве
		function minNode(node) {
			// если слева от узла ноль тогда это должен быть минимальный узел
			if (node.left === null)
				return node;
			else
				return minNode(node.left);
		}

		function removeNode(node, data) {
			if (node === null) {
				return null;
				// если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
				// если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
			} else if (data > node.data) {
				node.right = removeNode(node.right, data);
				return node;
				// если данные такие как данные корня, удаляем узел
			} else {
				// удаляем узел без потомков (листовой узел (leaf) или крайний)
				if (node.left === null && node.right === null) {
					node = null;
					return node;
				}
				// удаляем узел с одним потомком
				if (node.left === null) {
					node = node.right;
					return node;
				} else if (node.right === null) {
					node = node.left;
					return node;
				}
				// удаляем узел с двумя потомками
				// minNode правого поддерева хранится в новом узле
				let newNode = minNode(node.right);
				node.data = newNode.data;
				node.right = removeNode(node.right, newNode.data);
				return node;
			}
		}
	}

	min() {
		return this.getMin
	}

	max() {
		return this.getMax
	}
}


module.exports = {
	BinarySearchTree
};