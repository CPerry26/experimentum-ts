import type { RequestHandler } from "./handler.type.js";

export class RouteNode {
    private children: Map<string, RouteNode>;
    private handler: RequestHandler | null;

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

    setHandler(handler: RequestHandler): void {
        this.handler = handler;
    }

    getHandler(): RequestHandler | null {
        return this.handler;
    }
};