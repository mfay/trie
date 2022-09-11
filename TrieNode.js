const STORAGE_SIZE = 26
const A_CODE = 'a'.charCodeAt(0)

export default class TrieNode {
	constructor() {
		this.visitCount = 0
		this.isEndOfWord = false
		this.children = Array(STORAGE_SIZE).fill(null)
		this.parent = null
		this.letter = null
	}

	insert(key) {
		let length = key.length
		let node = this
		for (let level=0; level < length; level++) {
			let index = key[level].charCodeAt(0) - A_CODE
			if (node.children[index] === null) {
				node.children[index] = new TrieNode()
				node.children[index].letter = key[level]
				node.children[index].parent = node
			}
			node = node.children[index]
			node.visitCount++
		}
		node.isEndOfWord = true
	}

	search(key) {
		let length = key.length
		let node = this
		for (let level=0;level < length;level++) {
			let index = key[level].charCodeAt(0) - A_CODE
			if (node.children[index] === null) {
				return false
			}
			node = node.children[index]
		}
		return node.isEndOfWord
	}

	get(key) {
		let length = key.length
		let node = this
		for (let level=0;level < length;level++) {
			let index = key[level].charCodeAt(0) - A_CODE
			if (node.children[index] === null) {
				return null
			}
			node = node.children[index]
		}
		return node
	}

	word() {
		let word = []
		let node = this
		while (node.parent !== null) {
			word.push(node.letter)
			node = node.parent
		}
		return word.reverse().join('')
	}

	suggest(key) {
		let node = this.get(key)
		if (node === null) {
			return []
		}
		return node.words([])
	}

	words(found) {
		if (this.isEndOfWord) {
			found.push(this.word())
		}
		for (let i=0;i<this.children.length;i++) {
			if (this.children[i] === null) {
				continue
			}
			this.children[i].words(found)
		}
		return found
	}
}
