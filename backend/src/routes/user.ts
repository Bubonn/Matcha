import express from 'express';
import { users, userById, setBirth } from '../controllers/user';

const router = express.Router();

router.get('/', users);
router.get('/:id', userById);
router.post('/:id/birthdate', setBirth);

export default router;
