import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createClient } from 'redis';
import mongoose from "mongoose";
import bluebird from 'bluebird';
import { NODE_ENV, PORT, LOG_FORMAT, MONGODB_URI, REDIS_URI } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  private app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public async run() {
    //  Redis
    const client = REDIS_URI ? createClient({url: REDIS_URI}) : createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('ready', () => console.log('Redis Client Connected'));
  
    await client.connect();

    //  MongoDB
    mongoose.Promise = bluebird;
    try {
      await mongoose.connect(MONGODB_URI as string);
      console.log('MongoDB Connected');
    } catch (error) {
      console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
    }

    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as string, { stream }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
