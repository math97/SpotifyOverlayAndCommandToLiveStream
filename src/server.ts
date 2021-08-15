import express,{NextFunction,Response,Request} from 'express';
import cors from 'cors';

import routes from './routes/index';
import AppError from './AppError';

const app = express();

const port = 8080

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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

});

app.listen(port,()=>{
  console.log(`server starts on port ${port}`);
});
