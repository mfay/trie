import Trie from "./Trie.js";
import fs from "fs";
import readline from "readline";
import events from "events";

const loadWords = async () => {
  let words = [];
  const reader = readline.createInterface({
    input: fs.createReadStream("words.txt"),
    crlfDelay: Infinity,
  });
  reader.on("line", (line) => {
    words.push(line);
  });
  await events.once(reader, "close");
  return words;
};

const dictionary = await loadWords();
let trie = new Trie();
for (let i = 0; i < dictionary.length; i++) {
  trie.insert(dictionary[i]);
}
let suggestions = trie.suggest("z");
console.log(suggestions);
