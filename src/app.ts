import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './routes/routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.erros();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private erros(): void {
    this.express.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof Error) {
          return response.status(400).json({
            message: err.message
          });
        }
        return response.status(500).json({
          status: 'error',
          message: `Internal server error - ${err}`
        });
      }
    );
  }
}

export default new App().express;
