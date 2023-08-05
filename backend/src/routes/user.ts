import express from 'express';
import { users, userById, setBirth, setGender, setPreference, setDescription, setInterest, setAllInfosSet, photoUserById, addInterest, delInterest, updateUsername, updateFirstName, updateLastName, updateEmail, updatePassword, updateLocation, sendVerificationEmail, getSuggestions, manyUsers, getTags } from '../controllers/user';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/', users);
router.get('/suggestions', getSuggestions);
router.get('/email', sendVerificationEmail);
router.get('/photo/:id', photoUserById);
router.get('/manyUsers', manyUsers);
router.get('/tags', getTags);
router.get('/:id', userById);
router.post('/birthDate', acceptJsonOnly, setBirth);
router.post('/gender', acceptJsonOnly, setGender);
router.post('/preference', acceptJsonOnly, setPreference);
router.post('/description', acceptJsonOnly, setDescription);
router.post('/interest', acceptJsonOnly, setInterest);
router.patch('/addInterest', acceptJsonOnly, addInterest);
router.patch('/delInterest', acceptJsonOnly, delInterest);
router.patch('/allInfosSet', acceptJsonOnly, setAllInfosSet);
router.patch('/username', acceptJsonOnly, updateUsername);
router.patch('/firstName', acceptJsonOnly, updateFirstName);
router.patch('/lastName', acceptJsonOnly, updateLastName);
router.patch('/email', acceptJsonOnly, updateEmail);
router.patch('/password', acceptJsonOnly, updatePassword);
router.post('/location', acceptJsonOnly, updateLocation);

export default router;
