import express from 'express';
import { users, userById, setBirth, setGender, setPreference, setDescription, setTag } from '../controllers/user';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/', users);
router.get('/:id', userById);
router.post('/:id/birthdate', acceptJsonOnly, setBirth);
router.post('/:id/gender', acceptJsonOnly, setGender);
router.post('/:id/preference', acceptJsonOnly, setPreference);
router.post('/:id/description', acceptJsonOnly, setDescription);
router.post('/:id/tag', acceptJsonOnly, setTag);

export default router;
