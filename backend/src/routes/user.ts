import express from 'express';
import { users, userById, setBirth, setGender, setPreference, setDescription, setInterest, setAllInfosSet } from '../controllers/user';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/', users);
router.get('/:id', userById);
router.post('/birthDate', acceptJsonOnly, setBirth);
router.post('/gender', acceptJsonOnly, setGender);
router.post('/preference', acceptJsonOnly, setPreference);
router.post('/description', acceptJsonOnly, setDescription);
router.post('/interest', acceptJsonOnly, setInterest);
router.patch('/allInfosSet', acceptJsonOnly, setAllInfosSet);

export default router;
