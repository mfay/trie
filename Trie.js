export default class Trie {
  constructor() {
    this.parent = null
    this.visitCount = 0
    this.children = new Map()
    this.letter = null
    this.isEndOfWord = false
  }

  insert(key) {
    let size = key.length
    let node = this
    for (let level = 0; level < size; level++) {
      if (!node.children.has(key[level])) {
        let child = new Trie()
        child.parent = node
        child.letter = key[level]
        node.children.set(key[level], child)
      }
      node = node.children.get(key[level])
      node.visitCount++
    }
    node.isEndOfWord = true
  }

  search(key) {
    let size = key.length
    let node = this
    for (let level = 0; level < size; level++) {
      if (!node.children.has(key[level])) {
        return false
      }
      node = node.children.get(key[level])
    }
    return node.isEndOfWord
  }

  get(key) {
    let size = key.length
    let node = this
    for (let level = 0; level < size; level++) {
      if (!node.children.has(key[level])) {
        return null
      }
      node = node.children.get(key[level])
    }
    return node
  }

  word() {
    let data = ''
    let node = this
    while (node.parent !== null) {
      data = node.letter + data
      node = node.parent
    }
    return data
  }

  words(found) {
    if (this.isEndOfWord) {
      found.push(this.word())
    }
    for (const node of this.children.entries()) {
      node[1].words(found)
    }
    return found
  }

  suggest(key) {
    let node = this.get(key)
    if (node === null) {
      return []
    }
    return node.words([])
  }
}
