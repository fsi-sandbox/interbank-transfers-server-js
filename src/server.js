import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { sterling } from 'innovation-sandbox';

const app = express();

// Add critical middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/banks', async (req, res) => {
  import('./data/nigerian-banks.json').then(({ default: data }) => {
    res.status(200).json({
      banks: data
    });
  });
});

// Handle inter-bank funds transfer requests
app.post('/inter-bank/transfers', async (req, res) => {
  // const { to, message } = req.body;
  // const phoneNumPattern = /^\+234[0-9]{10}$/;
  // if (!to || !phoneNumPattern.test(to) || !message) {
  //   res.status(400).json({
  //     message: 'invalid request data'
  //   });
  //   return;
  // }

  try {
    res.status(200).json({
      status: 'Sent',
      message: 'transfer successful'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Unable to complete your request'
    });
    console.warn(e);
  }
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.log(err.status, req.path, err.message);
  res.status(err.status || 500).json({
    message: err.message
  });
});

export default app;
