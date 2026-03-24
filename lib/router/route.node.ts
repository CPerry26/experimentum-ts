import type { Handler } from "./handler.type.js";

export class RouteNode {
    private children: Map<string, RouteNode>;
    private handler: Handler | null;

    constructor() {
        this.children = new Map<string, RouteNode>();
        this.handler = null;
    }

    hasChild(path: string): boolean {
        return this.children.has(path);
    }

    getChild(path: string): RouteNode | undefined {
        return this.children.get(path);
    }

    addChild(path: string, child: RouteNode): void {
        this.children.set(path, child);
    }

    setHandler(handler: Handler): void {
        this.handler = handler;
    }

    getHandler(): Handler | null {
        return this.handler;
    }
};