import type { RequestHandler } from "./handler.type.js";

export interface ResolvedRoute {
    parameters: Record<string, string>;
    query: Record<string, string>;
    handler: RequestHandler | null;
};