import { RouteNode } from "./route.node.js";
import type { Handler } from "./handler.type.js";

export class Router {
    private rootNode: RouteNode;

    constructor() {
        this.rootNode = new RouteNode();
    }

    addRoute(path: string, handler: Handler): void {
        if (path.length === 0 || !path.startsWith("/") || path.includes(" ")) {
            throw new Error("Invalid route path provided");
        }

        if (typeof handler !== "function") {
            throw new Error("Invalid route handler provided");
        }

        let node: RouteNode = this.rootNode;

        // Remove slashes, in case of multiple slashes together, filter out empty strings
        const paths: string[] = path.split("/").filter((path) => path.length > 0);

        for (let path of paths) {
            path = path.toLowerCase();

            if (node.hasChild(path)) {
                // This is stupid, thanks TypeScript
                node = node.getChild(path) ?? node;
            } else {
                const newNode: RouteNode = new RouteNode();
                node.addChild(path, newNode);
                node = newNode;
            }
        }

        node.setHandler(handler);
    }

    findRoute(path: string): Handler | null {
        let node: RouteNode = this.rootNode;
        const paths: string[] = path.split("/");

        for (let path of paths) {
            path = path.toLowerCase();

            if (node.hasChild(path)) {
                // This is stupid, thanks TypeScript
                node = node.getChild(path) ?? node;
            } else {
                return null;
            }
        }

        return node.getHandler();
    }
};