import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import router from './routes/index';

const app = express();

// Add critical middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(router);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.log(err.status, req.path, err.message);
  res.status(err.status || 500).json({
    message: err.message
  });
});

export default app;
