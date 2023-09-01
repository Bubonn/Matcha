"use strict";
exports.__esModule = true;
var express_1 = require("express");
var uploads_1 = require("../controllers/uploads");
var multer_1 = require("multer");
var router = express_1["default"].Router();
var upload = multer_1["default"]({
    dest: 'uploads/',
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Seules les images au format JPG, JPEG, PNG et GIF sont autorisées.'));
        }
        cb(null, true);
    }
});
router.post('/', upload.single('photo_profil'), uploads_1.setPhoto);
router["delete"]('/', uploads_1.deletePhoto);
exports["default"] = router;
