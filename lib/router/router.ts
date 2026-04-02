import { RouteNode } from "./route.node.js";
import type { FunctionHandler, Handler, RequestHandler } from "./handler.type.js";
import { SUPPORTED_HTTP_METHODS } from "./http-methods.js";

export class Router {
    private rootNode: RouteNode;

    constructor() {
        this.rootNode = new RouteNode();
    }

    addRoute(path: string, method: string, handler: Handler): void {
        if (path.length === 0 || !path.startsWith("/") || path.includes(" ")) {
            throw new Error("Invalid route path provided");
        }

        if (!SUPPORTED_HTTP_METHODS.has(method.toUpperCase())) {
            throw new Error(`Unsupported HTTP method: ${method}`);
        }

        if (typeof handler !== "function") {
            throw new Error("Invalid route handler provided");
        }

        let node: RouteNode = this.rootNode;

        // Remove slashes, in case of multiple slashes together, filter out empty strings
        const paths: string[] = path.split("/").filter((path) => path.length > 0);

        // Normalize the handler to always be the same shape.
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

        node.addHandler(method, handlerFunc);
    }

    findRoute(path: string, method: string): RequestHandler | null {
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

        return node.getHandler(method);
    }

    /**
     * Wrap the incoming handler being added to the router to normalize it's shape. This
     * allows supporting handlers that either take the request or no parameters at all.
     * 
     * @param handler 
     * @returns A normalized RequestHandler function
     */
    private wrapHandler(handler: Handler): RequestHandler {
        // If there are some parameters (some arity), assert as a request handler.
        if (handler.length > 0) {
            return handler as RequestHandler;
        }

        // No arity, treat as a function handler and wrap.
        const functionHandler = handler as FunctionHandler;

        return function(request: Request): Response | Promise<Response> {
            void request;

            return functionHandler();
        }
    }
};