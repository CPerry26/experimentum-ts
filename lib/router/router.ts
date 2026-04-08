import { RouteNode } from "./route.node.js";
import type { FunctionHandler, Handler, RequestHandler } from "./handler.type.js";
import { SUPPORTED_HTTP_METHODS } from "./http-methods.js";
import type { ResolvedRoute } from "./resolved-route.js";

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
            const isDynamicParam: boolean = path.startsWith(":");
            const nodePath: string = isDynamicParam ? ":" : path;

            if (node.hasChild(nodePath)) {
                node = node.getChild(nodePath);
            } else {
                const newNode: RouteNode = new RouteNode();
                node.addChild(nodePath, newNode);
                node = newNode;
            }

            if (isDynamicParam) {
                node.addDynamicParam(path.slice(1));
            }
        }

        node.addHandler(method, handlerFunc);
    }

    findRoute(path: string, method: string): ResolvedRoute | null {
        let node: RouteNode = this.rootNode;
        const paths: string[] = path.split("/").filter((path) => path.length > 0);
        const dynamicParams: Record<string, string> = {};
        const queryParams: Record<string, string> = {};

        for (let path of paths) {
            path = path.toLowerCase();

            if (path.includes("?")) {
                // Strip the starting query params to check the rest of the path
                const tempPath = path.split("?")[0];
                if (!tempPath) {
                    console.warn(`Invalid query parameter path ${path}, skipping`);
                    continue;
                }

                // Grab the query params and add them as dynamic params if path is valid
                const parsedQueryParams = this.parseQueryParams(path);
                Object.assign(queryParams, parsedQueryParams);

                path = tempPath;
            }

            if (node.hasChild(path)) {
                node = node.getChild(path);
            } else if (node.hasChild(":")) {
                node = node.getChild(":");

                const dynamicParamName: string | null = node.getDynamicParam();

                if (dynamicParamName) {
                    dynamicParams[dynamicParamName] = path;
                }
            } else {
                return null;
            }
        }

        return { parameters: dynamicParams, query: queryParams, handler: node.getHandler(method) };
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

    private parseQueryParams(pathSegment: string): Record<string, string> {
        const parsedParams: Record<string, string> = {};

        // Ex: /user?id=123 => id=123
        const queryString = pathSegment.split("?")[1];

        if (!queryString) {
            return parsedParams;
        }

        // Ex: id=123 => { id: 123 }
        // Ex: redirect=%2Fhome => { redirect: "/home" }
        for (const param of queryString.split("&")) {
            const [key, value] = param.split("=");

            if (key && value) {
                parsedParams[key] = decodeURIComponent(value);
            } else {
                console.warn(`Invalid query parameter ${param}, skipping`);
            }
        }

        return parsedParams;
    }
};