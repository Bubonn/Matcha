import express from 'express';
import { signup, users } from '../controllers/login';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/users', users);
router.post('/signup', acceptJsonOnly, signup);

export default router;