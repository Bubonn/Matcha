import express from 'express';
import { checkToken, signin, signup, verifyTokenEmail } from '../controllers/login';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.post('/signin', acceptJsonOnly, signin);
router.post('/signup', acceptJsonOnly, signup);
router.get('/token', checkToken);
router.get('/verifyToken', verifyTokenEmail);

export default router;