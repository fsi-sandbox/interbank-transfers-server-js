import express from 'express';

import { confirmAccount, performTransfer } from './sterling-utils';

const router = express.Router();

// Handle inter-bank funds transfer requests
router.post('/transfers', async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { amount, fromAccount, toAccount, fromName, toName } = req.body;

  // TODO do better schema validation
  // as well as prevent things like attempts to transfer to the same account
  if (!amount || !fromAccount || !toAccount || !fromName || !toName) {
    res.status(400).json({
      message: 'Invalid transaction request'
    });
    return;
  }

  try {
    const status = await Promise.all([confirmAccount(fromAccount), confirmAccount(toAccount)]);
    const [fromAccountIsValid, toAccountIsValid] = status;

    if (!fromAccountIsValid || !toAccountIsValid) {
      res.status(404).json({
        message: 'Invalid transaction request. Pls check the account details'
      });
      return;
    }

    const transferStatus = await performTransfer({
      amount,
      fromAccount,
      toAccount,
      fromName,
      toName
    });

    if (!transferStatus || (transferStatus && transferStatus.message !== 'OK')) {
      res.status(500).json({
        message: 'Unable to complete your request. Pls try again'
      });
      return;
    }

    const tnxTime = Date.now();
    const tnxRef = Buffer.from(`${fromAccount}-${toAccount}-${tnxTime}`).toString('base64');
    res.status(200).json({
      status: 'OK',
      message: 'transfer successful',
      tnxRef,
      tnxTime,
      currency: 'NGN'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Unable to complete your request'
    });
    console.warn(e);
  }
});

export default router;
