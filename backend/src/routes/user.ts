import express from 'express';
import { users, userById, setBirth, setGender, setPreference, setDescription, setInterest, setAllInfosSet, photoUserById, addInterest, delInterest, updateUsername, updateFirstName, updateLastName, updateEmail, updatePassword, updateLocation, sendVerificationEmail, getSuggestions, manyUsers, getTags, getRelation, getConversationsByUserId, getConversationById, getMessagesById, getLastMessageById, updateNotificationsMessages, getNotificationsMessages, getNotifications } from '../controllers/user';
import acceptJsonOnly from '../middlewares/acceptJsonOnly';

const router = express.Router();

router.get('/', users);
router.get('/suggestions', getSuggestions);
router.get('/email', sendVerificationEmail);
router.get('/photo/:id', photoUserById);
router.get('/manyUsers', manyUsers);
router.get('/tags', getTags);
router.get('/conversations', getConversationsByUserId);
router.get('/notificationsMessages', getNotificationsMessages);
router.get('/notifications', getNotifications);
router.get('/lastMessage/:convId', getLastMessageById);
router.get('/conversation/:convId', getConversationById);
router.get('/messages/:convId', getMessagesById);
router.get('/:id', userById);
router.get('/relation/:userId', getRelation);
router.post('/birthDate', acceptJsonOnly, setBirth);
router.post('/gender', acceptJsonOnly, setGender);
router.post('/preference', acceptJsonOnly, setPreference);
router.post('/description', acceptJsonOnly, setDescription);
router.post('/interest', acceptJsonOnly, setInterest);
// router.post('/likeUser', acceptJsonOnly, like);
// router.post('/dislikeUser', acceptJsonOnly, dislike);
router.post('/notificationsMessages', acceptJsonOnly, updateNotificationsMessages);
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
