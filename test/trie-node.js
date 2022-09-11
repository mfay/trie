import { expect } from 'chai'
import TrieNode from '../TrieNode.js'

describe ('TrieNode', function() {
	describe ('constructor', function() {
		it ('should start with 26 null children', function() {
			let trie = new TrieNode()
			let count = 0
			for (let i=0;i<trie.children.length;i++) {
				if (trie.children[i] === null) {
					count++
				}
			}
			expect(count).to.equal(26)
		})

		it ('should have visit count of zero', function() {
			let trie = new TrieNode()
			expect(trie.visitCount).to.equal(0)
		})

		it ('should have a null parent', function() {
			let trie = new TrieNode()
			expect(trie.parent).to.equal(null)
		})
	})

	describe ('insert', function() {
		it ('should insert a word', function() {
			let trie = new TrieNode()
			trie.insert('word')
			let child = trie.children.find(el => el !== null)
			expect(child).to.not.equal(null)
		})

		it ('should have letter assigned', function() {
			let trie = new TrieNode()
			trie.insert('word')
			let child = trie.children.find(el => el !== null)
			expect(child.letter).to.equal('w')
		})
	})

	describe ('search', function() {
		it ('should find an inserted word', function() {
			let trie = new TrieNode()
			trie.insert('word')
			let found = trie.search('word')
			expect(found).to.equal(true)
		})

		it ('should not find a missing word', function() {
			let trie = new TrieNode()
			trie.insert('word')
			let found = trie.search('wordle')
			expect(found).to.equal(false)
		})
	})

	describe ('get', function() {
		it ('should return node if word found', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car']
			for (const word of words) {
				trie.insert(word)
			}
			let word = trie.get('car')
			expect(word).to.not.equal(null)
		})

		it ('should return null if not found', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car']
			for (const word of words) {
				trie.insert(word)
			}
			let word = trie.get('zoo')
			expect(word).to.equal(null)
		})

		it ('should return node if not full word', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car']
			for (const word of words) {
				trie.insert(word)
			}
			let word = trie.get('ca')
			expect(word.isEndOfWord).to.equal(false)
		})

		it ('should have visit count', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car', 'wordsworth']
			for (const word of words) {
				trie.insert(word)
			}
			let word = trie.get('word')
			expect(word.visitCount).to.equal(3)
		})
	})

	describe ('word', function() {
		it ('should return the word it represents', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car', 'wordsworth']
			for (const word of words) {
				trie.insert(word)
			}
			let word = trie.get('word')
			expect(word.word()).to.equal('word')
		})
	})

	describe ('suggest', function() {
		it ('should return an array of matching words', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car']
			for (const word of words) {
				trie.insert(word)
			}
			let suggestions = trie.suggest('wo')
			expect(['word', 'wordle']).deep.equal(suggestions)
		})

		it ('should return an empty array for no matches', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car']
			for (const word of words) {
				trie.insert(word)
			}
			let suggestions = trie.suggest('zoo')
			expect([]).deep.equal(suggestions)
		})

		it ('should return words in alphabetical order', function() {
			let trie = new TrieNode()
			let words = ['word', 'wordle', 'car', 'alpha']
			for (const word of words) {
				trie.insert(word)
			}
			let suggestions = trie.words([])
			expect(['alpha', 'car', 'word', 'wordle']).deep.equal(suggestions)
		})
	})

	describe ('words', function() {
		it ('should return all words from current node and all child nodes', function() {
			let trie = new TrieNode()
			trie.insert('cow')
			let suggestions = trie.words([])
			expect(['cow']).deep.equal(suggestions)
		})
	})
})

