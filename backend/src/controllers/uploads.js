"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deletePhoto = exports.setPhoto = void 0;
var connectionDb_1 = require("../services/connectionDb");
var fs = require("fs");
exports.setPhoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, photoId, file, propertyName, connection_1, getAndRemovePhoto, extension, newFileName_1, query_1, updatePhoto, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                photoId = req.body.photoId;
                file = req.file;
                propertyName = 'photo' + photoId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                connection_1 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query("SELECT photo" + photoId + " FROM user WHERE id = ?", id, function (changePhotoErr, changePhoto) {
                            if (changePhotoErr) {
                                reject(new Error('An error occurred while adding photo'));
                            }
                            else {
                                resolve(changePhoto);
                            }
                        });
                    })];
            case 2:
                getAndRemovePhoto = _b.sent();
                if (getAndRemovePhoto[0][propertyName]) {
                    fs.unlink("uploads/" + getAndRemovePhoto[0][propertyName], function (err) {
                        if (err) {
                            console.error('Error while remove the file', err);
                        }
                        else {
                            console.log('File deleted');
                        }
                    });
                }
                if (!file) return [3 /*break*/, 4];
                extension = file.originalname.split('.').pop();
                newFileName_1 = id + "-" + Date.now() + "." + extension;
                fs.rename(file.path, "uploads/" + newFileName_1, function (err) {
                    if (err) {
                        console.error('Error while renaming the file', err);
                        res.status(500).json({ error: 'An error occurred while saving the file' });
                    }
                    else {
                        console.log('File saved successfully');
                        // res.status(200).json({ message: 'File saved successfully' });
                    }
                });
                query_1 = "UPDATE user SET photo" + photoId + " = ? WHERE id = ?";
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(query_1, [newFileName_1, id], function (changePhotoErr, changePhoto) {
                            if (changePhotoErr) {
                                reject(new Error('An error occurred while adding photo'));
                            }
                            else {
                                resolve(changePhoto);
                            }
                        });
                    })];
            case 3:
                updatePhoto = _b.sent();
                _b.label = 4;
            case 4: return [2 /*return*/, res.status(200).json({ message: 'File saved successfully' })];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating photo' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deletePhoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, photoId, propertyName, connection_2, getAndRemovePhoto, query, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                photoId = req.query.photoId;
                propertyName = 'photo' + photoId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_2 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_2.query("SELECT photo" + photoId + " FROM user WHERE id = ?", id, function (changePhotoErr, changePhoto) {
                            if (changePhotoErr) {
                                reject(new Error('An error occurred while adding photo'));
                            }
                            else {
                                resolve(changePhoto);
                            }
                        });
                    })];
            case 2:
                getAndRemovePhoto = _b.sent();
                if (getAndRemovePhoto[0][propertyName]) {
                    fs.unlink("uploads/" + getAndRemovePhoto[0][propertyName], function (err) {
                        if (err) {
                            console.error('Error while remove the file', err);
                        }
                        else {
                            console.log('File deleted');
                        }
                    });
                    query = "UPDATE user SET " + propertyName + " = NULL WHERE id = ?";
                    connection_2.query(query, [id], function (err, result) {
                        if (err) {
                            console.error('Error while deleting the photo:', err);
                            // Gérer l'erreur
                            res.status(500).json({ error: 'Error while deleting the photo' });
                        }
                        else {
                            console.log('Photo deleted successfully.');
                        }
                    });
                }
                return [2 /*return*/, res.status(200).json({ message: 'Photo deleted successfully.' })];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating photo' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
