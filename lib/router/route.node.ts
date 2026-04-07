import type { RequestHandler } from "./handler.type.js";

export class RouteNode {
    private children: Map<string, RouteNode>;
    private handlers: Map<string, RequestHandler | null>;
    private dynamicParam: string | null;

    constructor() {
        this.children = new Map<string, RouteNode>();
        this.handlers = new Map<string, RequestHandler | null>();
        this.dynamicParam = null;
    }

    hasChild(path: string): boolean {
        return this.children.has(path);
    }

    getChild(path: string): RouteNode {
        // Extract the node and check if it exists.
        // NB: The caller uses `hasChild` before calling but this is cleaner TS.
        const child: RouteNode | undefined = this.children.get(path);
        
        if (!child) {
            throw new Error(`Child node ${path} does not exist`);
        }

        return child;
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

    addDynamicParam(name: string): void {
        this.dynamicParam = name;
    }

    getDynamicParam(): string | null {
        return this.dynamicParam;
    }
};