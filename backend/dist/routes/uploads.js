"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploads_1 = require("../controllers/uploads");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// const upload = multer({ dest: 'uploads/' });
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        // Vérifiez le type de fichier pour vous assurer que c'est une image valide
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return cb(new Error('Seules les images au format JPG, JPEG, PNG et GIF sont autorisées.'));
        }
        cb(null, true);
    }
});
router.post('/:id', upload.single('photo_profil'), uploads_1.setPhoto);
exports.default = router;
