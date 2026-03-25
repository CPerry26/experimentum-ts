export type RequestHandler = (request: Request) => Response | Promise<Response>;
export type FunctionHandler = () => Response | Promise<Response>;
export type Handler = RequestHandler | FunctionHandler;