import express from 'express';

import banksController from './ng-banks';
import transfersController from './interbank-transfers';

const router = express.Router();

router.use('/banks/ng-banks', banksController);
router.use('/banks/inter-bank', transfersController);

export default router;
