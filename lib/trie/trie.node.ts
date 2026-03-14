export class TrieNode {
    private children: Map<string, TrieNode>;
    private isEndOfWord: boolean;
    private char: string;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
        this.char = "";
    }

    public getChildren(): Map<string, TrieNode> {
        return this.children;
    }

    public getIsEndOfWord(): boolean {
        return this.isEndOfWord;
    }

    public getChar(): string {
        return this.char;
    }

    public setChar(char: string): void {
        this.char = char;
    }

    public setIsEndOfWord(isEndOfWord: boolean): void {
        this.isEndOfWord = isEndOfWord;
    }
    
    public addChild(child: TrieNode): void {
        const char: string = child.getChar();
        
        if (!this.children.has(char)) {
            this.children.set(char, child);
        }
    }

    public hasChild(char: string): boolean {
        return this.children.has(char);
    }
}