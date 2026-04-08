import { TrieNode } from "./trie.node.js";

// Experimental attempt at writing a simple Trie data structure for routing.
// This is not exported and not planned to be used anywhere.
// @ts-expect-error Experiemental and unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node: TrieNode = this.root;

        for (const char of word) {
            if (node.hasChild(char)) {
                // This is stupid, thanks TypeScript
                node = node.getChildren().get(char) ?? node;
            } else {
                const newNode: TrieNode = new TrieNode();
                newNode.setChar(char);
                node.addChild(newNode);
                node = newNode;
            }
        }

        node.setIsEndOfWord(true);
    }

    search(word: string): boolean {
        let node: TrieNode = this.root;

        for (const char of word) {
            if (node.hasChild(char)) {
                // This is stupid, thanks TypeScript
                node = node.getChildren().get(char) ?? node;
            } else {
                return false;
            }
        }
        
        return node.getIsEndOfWord();
    }
}