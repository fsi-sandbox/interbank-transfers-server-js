import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  import('../data/nigerian-banks.json').then(({ default: data }) => {
    res.status(200).json({
      banks: data
    });
  });
});

export default router;
