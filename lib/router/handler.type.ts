export type RequestHandler = (request: Request) => Response | Promise<Response>;
export type FunctionHandler = (...args: unknown[]) => unknown;
export type Handler = RequestHandler | FunctionHandler;