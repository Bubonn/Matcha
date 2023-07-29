"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const acceptJsonOnly_1 = __importDefault(require("../middlewares/acceptJsonOnly"));
const router = express_1.default.Router();
router.get('/', user_1.users);
router.get('/:id', user_1.userById);
router.get('/photo/:id', user_1.photoUserById);
router.post('/birthDate', acceptJsonOnly_1.default, user_1.setBirth);
router.post('/gender', acceptJsonOnly_1.default, user_1.setGender);
router.post('/preference', acceptJsonOnly_1.default, user_1.setPreference);
router.post('/description', acceptJsonOnly_1.default, user_1.setDescription);
router.post('/interest', acceptJsonOnly_1.default, user_1.setInterest);
router.patch('/addInterest', acceptJsonOnly_1.default, user_1.addInterest);
router.patch('/delInterest', acceptJsonOnly_1.default, user_1.delInterest);
router.patch('/allInfosSet', acceptJsonOnly_1.default, user_1.setAllInfosSet);
router.patch('/username', acceptJsonOnly_1.default, user_1.updateUsername);
router.patch('/firstName', acceptJsonOnly_1.default, user_1.updateFirstName);
router.patch('/lastName', acceptJsonOnly_1.default, user_1.updateLastName);
router.patch('/email', acceptJsonOnly_1.default, user_1.updateEmail);
router.patch('/password', acceptJsonOnly_1.default, user_1.updatePassword);
exports.default = router;
