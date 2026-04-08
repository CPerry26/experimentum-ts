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
router.addRoute("/api/v1/user/:userId", "PUT", () => { console.log('HELLO PUT'); return new Response("Hello API v1 userId PUT"); });
router.addRoute("/api/v1/user/:userId/profile", "GET", () => { console.log('HELLO GET DYNAMIC'); return new Response("Hello API v1 profile GET DYNAMIC"); });
router.addRoute("/api/v1/user/:userId/profile/:setting/update", "PUT", () => { console.log('HELLO PUT SETTING DYNAMIC'); return new Response("Hello API v1 profile PUT SETTING DYNAMIC"); });
router.addRoute("/api/v1//users/:id/hello/there/:some/:hello", "GET", () => { console.log('HELLO GET MULTI DYNAMIC'); return new Response("Hello API v1 GET MULTI DYNAMIC"); });
router.addRoute("/api/v1/users", "GET", () => { console.log('HELLO GET QUERY PARAM'); return new Response("Hello API v1 GET QUERY PARAM"); });

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
const putDynamic = router.findRoute("/api/v1/user/123", "PUT");
const getDynamic = router.findRoute("/api/v1/user/123/profile", "GET");
const putSettingDynamic = router.findRoute("/api/v1/user/123/profile/456/update", "PUT");
const multiDynamic1 = router.findRoute("/api/v1/users/789/hello/there/abc/def", "GET");
const multiDynamic2 = router.findRoute("/api/v1/users/999/hello/there/ghi/jkl", "GET");
const queryParamTest = router.findRoute("/api/v1/users?id=123&filter=all", "GET");
const queryParamEncodedTest = router.findRoute("/api/v1/users?redirect=%2Fhome", "GET");

console.log('home', home === null);
console.log('test', test === null);
console.log('partial', partial === null);
console.log('invalid', invalid === null);
console.log('homePost', homePost === null);
console.log('putDynamic', putDynamic === null);
console.log('getDynamic', getDynamic === null);
console.log('putSettingDynamic', putSettingDynamic === null);

void home?.handler?.(new Request("http://examplehome.com"));
void test?.handler?.(new Request("http://exampletest.com"));
void homePost?.handler?.(new Request("http://examplehomepost.com"));

console.log('Put dynamic', putDynamic);
console.log('Get dynamic', getDynamic);
console.log('Put setting dynamic', putSettingDynamic);
console.log('Multi dynamic 1', multiDynamic1);
console.log('Multi dynamic 2', multiDynamic2);
console.log('Query param test', queryParamTest);
console.log('Query param encoded test', queryParamEncodedTest);
void putDynamic?.handler?.(new Request("http://exampleputdynamic.com"));
void getDynamic?.handler?.(new Request("http://examplegetdynamic.com"));
void putSettingDynamic?.handler?.(new Request("http://exampleputsettingdynamic.com"));
void multiDynamic1?.handler?.(new Request("http://examplemultidynamic1.com"));
void multiDynamic2?.handler?.(new Request("http://examplemultidynamic2.com"));
void queryParamTest?.handler?.(new Request("http://examplequeryparamtest.com"));