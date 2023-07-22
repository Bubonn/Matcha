import express from 'express';
<<<<<<< HEAD
import { signin, signup, users } from '../controllers/login';
=======
import { signup, users } from '../controllers/login';
>>>>>>> baa91f5ab7f61181cbc7fb774a58b54069c2a87d
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/users', users);
<<<<<<< HEAD
router.post('/signin', acceptJsonOnly, signin);
=======
>>>>>>> baa91f5ab7f61181cbc7fb774a58b54069c2a87d
router.post('/signup', acceptJsonOnly, signup);

export default router;