import type { RequestHandler } from "./handler.type.js";

export class RouteNode {
    private children: Map<string, RouteNode>;
    private handlers: Map<string, RequestHandler | null>;

    constructor() {
        this.children = new Map<string, RouteNode>();
        this.handlers = new Map<string, RequestHandler | null>();
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

    addHandler(method: string, handler: RequestHandler): void {
        this.handlers.set(method.toUpperCase(), handler);
    }

    getHandler(method: string): RequestHandler | null {
        return this.handlers.get(method.toUpperCase()) ?? null;
    }
};