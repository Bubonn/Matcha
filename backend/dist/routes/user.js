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
router.post('/:id/birthdate', acceptJsonOnly_1.default, user_1.setBirth);
router.post('/:id/gender', acceptJsonOnly_1.default, user_1.setGender);
router.post('/:id/preference', acceptJsonOnly_1.default, user_1.setPreference);
router.post('/:id/description', acceptJsonOnly_1.default, user_1.setDescription);
router.post('/:id/tag', acceptJsonOnly_1.default, user_1.setTag);
exports.default = router;
