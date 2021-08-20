import express,{Express,NextFunction,Request,Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index';
import AppError from './AppError';
class App {
  express: Express;
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
    this.error();

    this.express.listen(process.env.PORT,()=>{
      console.log(`server starts on port ${process.env.PORT}`);
    });
  }

  database() {
    mongoose.connect(`mongodb:${process.env.DATABASE_URI}`, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('connected to database');
    });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }
  
  error(){    
    this.express.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }
        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        })
      }
    )
  }
}
export default new App().express;