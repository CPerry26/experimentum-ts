import { RouteNode } from "./route.node.js";
import type { FunctionHandler, Handler, RequestHandler } from "./handler.type.js";

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

        const handlerFunc: RequestHandler = this.wrapHandler(handler);

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

        node.setHandler(handlerFunc);
    }

    findRoute(path: string): RequestHandler | null {
        let node: RouteNode = this.rootNode;
        const paths: string[] = path.split("/").filter((path) => path.length > 0);

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

    private wrapHandler(handler: Handler): RequestHandler {
        if (handler.length > 0) {
            return handler as RequestHandler;
        }

        const functionHandler = handler as FunctionHandler;

        return function(request: Request): Response | Promise<Response> {
            void request;

            return functionHandler();
        }
    }
};