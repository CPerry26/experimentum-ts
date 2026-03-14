import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export type RequestHandler = (
  request: IncomingMessage,
  response: ServerResponse
) => void | Promise<void>;

export interface App {
  readonly handle: RequestHandler;
  use(handler: RequestHandler): void;
  listen(port: number, hostname?: string): Promise<void>;
}

const defaultHandler: RequestHandler = (_request, response) => {
  response.statusCode = 404;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify({ error: "Not Found" }));
};

export const createApp = (): App => {
  let currentHandler: RequestHandler = defaultHandler;

  return {
    get handle() {
      return currentHandler;
    },
    use(handler: RequestHandler): void {
      currentHandler = handler;
    },
    async listen(port: number, hostname?: string): Promise<void> {
      const server = createServer((request, response) => {
        Promise.resolve(currentHandler(request, response)).catch((error: unknown) => {
          response.statusCode = 500;
          response.setHeader("content-type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ error: "Internal Server Error" }));

          if (error instanceof Error) {
            process.stderr.write(`${error.name}: ${error.message}\n`);
            return;
          }

          process.stderr.write(`Unknown server error: ${String(error)}\n`);
        });
      });

      await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen(port, hostname, () => {
          server.off("error", reject);
          resolve();
        });
      });
    }
  };
};
