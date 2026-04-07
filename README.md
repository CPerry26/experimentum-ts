# experimentum-ts

A learning experiement to build an HTTP framework in TypeScript for Node. This is not production ready, nor should it be used for real development.

## Project Goal

This project was meant to explore behind the curtains. As a backend developer, we use frameworks and libraries to power high performance applications. But how do those work under the hood? After doing some learning, and also spending some time exploring this specifically for [Node](https://github.com/ishtms/learn-nodejs-hard-way), this is the result. All code and lessons are my own, but I want to give credit for my starting point.

This project is not meant to be fully featured, or to build out an entire framework. That's a lot of effort. The main focus was to build something functionality, with some nice basic features to understand the core components of a framework.

## Features
- Trie based routing and lookup
- Multiple request handler signatures (no arg, req, and req/res)
- Core HTTP verbs (GET, POST, PUT, PATCH, DELETE, OPTIONS)
- Simplistic console logger for framework logging
- Server implementation with basic configuration using Node's `createServer`
- Fully typed implementation
- Dyanmic routing
- Query parameters
