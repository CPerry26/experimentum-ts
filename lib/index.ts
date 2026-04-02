// import { Trie } from "./trie/trie.js";

// const trie = new Trie();
// trie.insert("code");
// trie.insert("coding");

// console.log(trie.search("code"));
// console.log(trie.search("coding"));
// console.log(trie.search("cod"));

import { Router } from "./router/router.js";

function homeHandler(): Response {
    console.log("Hello home");
    return new Response("Hello home");
}

function testHandler(): Response {
    console.log("Testing 123");
    return new Response("Testing 123");
}

const router: Router = new Router();
router.addRoute("/api/v1/home", "get", homeHandler);
router.addRoute("/api/v1/router/test", "post", testHandler);
router.addRoute("/api/v1/home", "post", () => { console.log('HELLO POST'); return new Response("Hello API v1 home POST"); });

try {
    router.addRoute("/api/v1/home", "HEAD", () => new Response("Hello API v1 home HEAD"));
} catch (error) {
    console.error('Caught expected error for unsupported method', error);
}

const home = router.findRoute("/API/v1/home", "get");
const homePost = router.findRoute("/api/v1/home", "post");
const test = router.findRoute("/api/v1/router/test", "POST");
const partial = router.findRoute("/api/v1/", "GET");
const invalid = router.findRoute("/api/v1/home", "HEAD");

console.log('home', home === null);
console.log('test', test === null);
console.log('partial', partial === null);
console.log('invalid', invalid === null);
console.log('homePost', homePost === null);

void home?.(new Request("http://examplehome.com"));
void test?.(new Request("http://exampletest.com"));
void homePost?.(new Request("http://examplehomepost.com"));