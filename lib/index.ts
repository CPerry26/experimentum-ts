// import { Trie } from "./trie/trie.js";

// const trie = new Trie();
// trie.insert("code");
// trie.insert("coding");

// console.log(trie.search("code"));
// console.log(trie.search("coding"));
// console.log(trie.search("cod"));

import { Router } from "./router/router.js";

function homeHandler(): void {
    console.log("Hello home");
}

function testHandler(): void {
    console.log("Testing 123");
}

const router: Router = new Router();
router.addRoute("/api/v1/home", homeHandler);
router.addRoute("/api/v1/router/test", testHandler);

const home = router.findRoute("/API/v1/home");
const test = router.findRoute("/api/v1/router/test");
const partial = router.findRoute("/api/v1/");

console.log('home', home === null);
console.log('test', test === null);
console.log('partial', partial === null);