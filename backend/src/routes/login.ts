import express from 'express';
import { signin, signup } from '../controllers/login';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.post('/signin', acceptJsonOnly, signin);
router.post('/signup', acceptJsonOnly, signup);

export default router;