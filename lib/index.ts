import { Trie } from "./trie/trie.js";

const trie = new Trie();
trie.insert("code");
trie.insert("coding");

console.log(trie.search("code"));
console.log(trie.search("coding"));
console.log(trie.search("cod"));