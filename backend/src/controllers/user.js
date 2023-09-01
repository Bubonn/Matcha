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
exports.getMutualBlockCheck = exports.delBlockUser = exports.getBlockList = exports.reportUser = exports.setReadNotifications = exports.getHistory = exports.getLikes = exports.getNotifications = exports.getNotificationsMessages = exports.updateNotificationsMessages = exports.getLastMessageById = exports.getMessagesById = exports.getConversationById = exports.getConversationsByUserId = exports.getRelation = exports.getTags = exports.getSuggestions = exports.sendVerificationEmail = exports.updateLocation = exports.updatePassword = exports.updateEmail = exports.updateLastName = exports.updateFirstName = exports.updateUsername = exports.setAllInfosSet = exports.delInterest = exports.addInterest = exports.setInterest = exports.setDescription = exports.setPreference = exports.setGender = exports.setBirth = exports.photoUserById = exports.manyUsers = exports.userById = exports.users = void 0;
var connectionDb_1 = require("../services/connectionDb");
var util_1 = require("util");
var userUtils_1 = require("../utils/userUtils");
var nodemailer_1 = require("nodemailer");
var sharp_1 = require("sharp");
var fs = require("fs");
var argon2_1 = require("argon2");
var db_1 = require("../services/db");
exports.users = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, query;
    return __generator(this, function (_a) {
        connection = connectionDb_1.getConnection();
        query = 'SELECT * FROM user';
        connection.query(query, function (err, results) {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête:', err);
                res.status(500).json({ error: 'Erreur lors de la récupération des éléments.' });
            }
            else {
                res.json(results);
            }
        });
        return [2 /*return*/];
    });
}); };
exports.userById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function getAge() {
        var birth = new Date(user_1[0].birth);
        var currentDate = new Date();
        var differenceInMillisec = currentDate - birth;
        var age = differenceInMillisec / (1000 * 60 * 60 * 24 * 365.25);
        return Math.floor(age);
    }
    var id, myId, connection_1, checkUserQuery_1, user_1, checkTagsQuery_1, tags, checkImageQuery_1, photo, filePath, resizedImageBuffer, base64Image, error_1, checkLocationQuery_1, location_1, checkReportQuery_1, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                myId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                connection_1 = connectionDb_1.getConnection();
                checkUserQuery_1 = 'SELECT *, NULL AS password FROM user WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(checkUserQuery_1, id, function (checkUserErr, checkUserResults) {
                            if (checkUserErr) {
                                reject(new Error('Une erreur est survenue lors de la vérification du nom d\'utilisateur.'));
                            }
                            else {
                                resolve(checkUserResults);
                            }
                        });
                    })];
            case 2:
                user_1 = _b.sent();
                if (!user_1.length) {
                    return [2 /*return*/, res.status(409).json({ error: 'User not found' })];
                }
                checkTagsQuery_1 = 'SELECT user_tag.tag_id FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id WHERE user.id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(checkTagsQuery_1, id, function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 3:
                tags = _b.sent();
                user_1[0].interests = tags.map(function (tag) { return tag.tag_id; });
                checkImageQuery_1 = 'SELECT photo1 FROM user WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(checkImageQuery_1, id, function (checkimgErr, checkimgResults) {
                            if (checkimgErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des images'));
                            }
                            else {
                                resolve(checkimgResults);
                            }
                        });
                    })];
            case 4:
                photo = _b.sent();
                if (!photo[0].photo1) return [3 /*break*/, 8];
                filePath = 'uploads/' + photo[0].photo1;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, sharp_1["default"](filePath)
                        .resize({ width: 30 }) // Spécifiez la largeur souhaitée en pixels
                        .toBuffer()];
            case 6:
                resizedImageBuffer = _b.sent();
                base64Image = resizedImageBuffer.toString('base64');
                user_1[0].mainPhoto = base64Image;
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                console.error('Une erreur est survenue lors du traitement de l\'image :', error_1);
                return [3 /*break*/, 8];
            case 8:
                checkLocationQuery_1 = 'SELECT location FROM user WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(checkLocationQuery_1, myId, function (checkLocationErr, checkLocationResults) {
                            if (checkLocationErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation de la localisation'));
                            }
                            else {
                                var distance = userUtils_1.calculateDistance(user_1[0].location, checkLocationResults[0].location);
                                user_1[0].distance = distance;
                                resolve(checkLocationResults);
                            }
                        });
                    })];
            case 9:
                location_1 = _b.sent();
                checkReportQuery_1 = 'SELECT * FROM reportUser WHERE id_user_source = ? AND id_user_target = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(checkReportQuery_1, [myId, id], function (reportErr, reportResults) {
                            if (reportErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation de la localisation'));
                            }
                            else {
                                if (reportResults.length > 0) {
                                    user_1[0].report = true;
                                }
                                else {
                                    user_1[0].report = false;
                                }
                                resolve(reportResults);
                            }
                        });
                    })];
            case 10:
                _b.sent();
                user_1[0].age = getAge();
                return [2 /*return*/, res.json(user_1[0])];
            case 11:
                error_2 = _b.sent();
                console.error('Erreur lors de la recherche de l\'utilisateur par son ID:', error_2);
                return [2 /*return*/, res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' })];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.manyUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, myId, parsedIds, connection_2, checkUserQuery, escapedIds, finalQuery_1, users_2, _loop_1, _i, users_1, user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ids = req.query.ids;
                myId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!Array.isArray(ids)) {
                    return [2 /*return*/, res.status(400).json({ error: 'Paramètre "ids" manquant ou invalide.' })];
                }
                parsedIds = ids.map(function (id) { return parseInt(id, 10); }).filter(function (id) { return !isNaN(id); });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                connection_2 = connectionDb_1.getConnection();
                checkUserQuery = 'SELECT * FROM user WHERE id IN (?)';
                escapedIds = parsedIds.join(', ');
                finalQuery_1 = checkUserQuery.replace('?', escapedIds);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_2.query(finalQuery_1, function (checkUserErr, checkUserResults) {
                            if (checkUserErr) {
                                reject(new Error('Une erreur est survenue lors de la vérification du nom d\'utilisateur.'));
                            }
                            else {
                                resolve(checkUserResults);
                            }
                        });
                    })];
            case 2:
                users_2 = _b.sent();
                _loop_1 = function (user) {
                    function getAge() {
                        var birth = new Date(user.birth);
                        var currentDate = new Date();
                        var differenceInMillisec = currentDate - birth;
                        var age = differenceInMillisec / (1000 * 60 * 60 * 24 * 365.25);
                        return Math.floor(age);
                    }
                    var checkTagsQuery, tags, checkImageQuery, photo, checkLocationQuery;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                checkTagsQuery = 'SELECT user_tag.tag_id FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id WHERE user.id = ?';
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        connection_2.query(checkTagsQuery, user.id, function (checkTagErr, checkTagResults) {
                                            if (checkTagErr) {
                                                reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                                            }
                                            else {
                                                resolve(checkTagResults);
                                            }
                                        });
                                    })];
                            case 1:
                                tags = _a.sent();
                                user.interests = tags.map(function (tag) { return tag.tag_id; });
                                checkImageQuery = 'SELECT photo1 FROM user WHERE id = ?';
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        connection_2.query(checkImageQuery, user.id, function (checkimgErr, checkimgResults) {
                                            if (checkimgErr) {
                                                reject(new Error('Une erreur est survenue lors de la recuperation des images'));
                                            }
                                            else {
                                                resolve(checkimgResults);
                                            }
                                        });
                                    })];
                            case 2:
                                photo = _a.sent();
                                if (!photo[0].photo1) return [3 /*break*/, 4];
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        fs.readFile('uploads/' + photo[0].photo1, function (err, data) {
                                            if (err) {
                                                reject(new Error('Une erreur est survenue lors de la recuperation des images'));
                                            }
                                            var base64Image = Buffer.from(data).toString('base64');
                                            user.mainPhoto = base64Image;
                                            resolve(data);
                                        });
                                    })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                checkLocationQuery = 'SELECT location FROM user WHERE id = ?';
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        connection_2.query(checkLocationQuery, myId, function (checkLocationErr, checkLocationResults) {
                                            if (checkLocationErr) {
                                                reject(new Error('Une erreur est survenue lors de la recuperation de la localisation'));
                                            }
                                            else {
                                                var distance = userUtils_1.calculateDistance(user.location, checkLocationResults[0].location);
                                                user.distance = distance;
                                                resolve(checkLocationResults);
                                            }
                                        });
                                    })];
                            case 5:
                                _a.sent();
                                user.age = getAge();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, users_1 = users_2;
                _b.label = 3;
            case 3:
                if (!(_i < users_1.length)) return [3 /*break*/, 6];
                user = users_1[_i];
                return [5 /*yield**/, _loop_1(user)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, res.json(users_2)];
            case 7:
                error_3 = _b.sent();
                console.error('Erreur lors de la recherche de l\'utilisateur par son ID:', error_3);
                return [2 /*return*/, res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.photoUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_1, connection_3, checkImageQuery_2, photo, i, photoField, photoFileName, readFileAsync, data, base64Image, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id_1 = req.params.id;
                connection_3 = connectionDb_1.getConnection();
                checkImageQuery_2 = 'SELECT photo1, photo2, photo3, photo4, photo5 FROM user WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_3.query(checkImageQuery_2, id_1, function (checkimgErr, checkimgResults) {
                            if (checkimgErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des images'));
                            }
                            else {
                                resolve(checkimgResults);
                            }
                        });
                    })];
            case 1:
                photo = _a.sent();
                i = 1;
                _a.label = 2;
            case 2:
                if (!(i <= 5)) return [3 /*break*/, 5];
                photoField = "photo" + i;
                photoFileName = photo[0][photoField];
                if (!photoFileName) {
                    return [3 /*break*/, 4];
                }
                readFileAsync = util_1.promisify(fs.readFile);
                return [4 /*yield*/, readFileAsync('uploads/' + photoFileName)];
            case 3:
                data = _a.sent();
                base64Image = Buffer.from(data).toString('base64');
                photo[0][photoField] = base64Image;
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, res.json(photo[0])];
            case 6:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while retrieving the images' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.setBirth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, birthDate, connection_4, isAdult, updatedBirth, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                birthDate = req.body.birthDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_4 = connectionDb_1.getConnection();
                if (!birthDate) {
                    return [2 /*return*/, res.status(400).json({ message: 'Birth date must be provided' })];
                }
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var dateOfBirthObj = new Date(birthDate);
                        var currentDate = new Date();
                        var age = currentDate.getFullYear() - dateOfBirthObj.getFullYear();
                        var birthdayHasPassed = currentDate.getMonth() > dateOfBirthObj.getMonth() ||
                            (currentDate.getMonth() === dateOfBirthObj.getMonth() &&
                                currentDate.getDate() >= dateOfBirthObj.getDate());
                        if (!birthdayHasPassed) {
                            age--;
                        }
                        if (age >= 18) {
                            resolve();
                        }
                        else {
                            return res.status(403).json({ error: 'User must be adult' });
                        }
                    })];
            case 2:
                isAdult = _b.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_4.query('UPDATE user SET birth = ? WHERE id = ?', [birthDate, id], function (changeBirthErr, changeBirth) {
                            if (changeBirthErr) {
                                reject(new Error('An error occurred while adding the birth date'));
                            }
                            else {
                                resolve(changeBirth);
                            }
                        });
                    })];
            case 3:
                updatedBirth = _b.sent();
                return [2 /*return*/, res.json({ message: 'Birth date successfully set' })];
            case 4:
                error_5 = _b.sent();
                console.error('Error updating user\'s birth date:', error_5);
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating the birth date' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.setGender = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, gender, connection_5, updatedGender, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                gender = req.body.gender;
                if (gender !== 'man' && gender !== 'woman') {
                    return [2 /*return*/, res.status(400).json({ error: 'Bad request' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_5 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_5.query('UPDATE user SET gender = ? WHERE id = ?', [gender, id], function (changeGenderhErr, changeGender) {
                            if (changeGenderhErr) {
                                reject(new Error('An error occurred while adding gender'));
                            }
                            else {
                                resolve(changeGender);
                            }
                        });
                    })];
            case 2:
                updatedGender = _b.sent();
                return [2 /*return*/, res.json({ message: 'Gender successfully set' })];
            case 3:
                error_6 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating gende' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setPreference = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, preference, connection_6, updatedPreference, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                preference = req.body.preference;
                if (preference !== 'man' && preference !== 'woman' && preference !== 'both') {
                    return [2 /*return*/, res.status(400).json({ error: 'Bad request' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_6 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_6.query('UPDATE user SET preference = ? WHERE id = ?', [preference, id], function (changePreferenceErr, changePreference) {
                            if (changePreferenceErr) {
                                reject(new Error('An error occurred while adding gender'));
                            }
                            else {
                                resolve(changePreference);
                            }
                        });
                    })];
            case 2:
                updatedPreference = _b.sent();
                return [2 /*return*/, res.json({ message: 'Preference successfully set' })];
            case 3:
                error_7 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating preference' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setDescription = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, description, connection_7, updatedDescription, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                description = req.body.description;
                if (!description || description.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'You must set a description' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_7 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_7.query('UPDATE user SET description = ? WHERE id = ?', [description, id], function (changeDescriptionErr, changeDescription) {
                            if (changeDescriptionErr) {
                                reject(new Error('An error occurred while adding a description'));
                            }
                            else {
                                resolve(changeDescription);
                            }
                        });
                    })];
            case 2:
                updatedDescription = _b.sent();
                return [2 /*return*/, res.json({ message: 'Description successfully set' })];
            case 3:
                error_8 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating a description' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setInterest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, interests, connection_8, updatedInterest, error_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                interests = req.body.interests;
                if (!interests || interests.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'You must set a tags' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_8 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        for (var _i = 0, interests_1 = interests; _i < interests_1.length; _i++) {
                            var tagId = interests_1[_i];
                            var insertQuery = 'INSERT INTO user_tag (user_id, tag_id) VALUES (?, ?)';
                            var values = [id, tagId + 1];
                            connection_8.query(insertQuery, values, function (error) {
                                if (error) {
                                    reject(new Error('Error occurred while inserting the tag'));
                                }
                                else {
                                    resolve();
                                }
                            });
                        }
                    })];
            case 2:
                updatedInterest = _b.sent();
                return [2 /*return*/, res.json({ message: 'Tags successfully set' })];
            case 3:
                error_9 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error occurred while inserting the tag' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addInterest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idInterest, connection_9, addInterest_1, error_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                idInterest = req.body.idInterest;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_9 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'INSERT INTO user_tag (user_id, tag_id) VALUES (?, ?)';
                        var values = [id, idInterest];
                        connection_9.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while inserting the tag'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                addInterest_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'Tags successfully set' })];
            case 3:
                error_10 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error occurred while inserting the tag' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.delInterest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idInterest, connection_10, delInterest_1, error_11;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                idInterest = req.body.idInterest;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_10 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'DELETE FROM user_tag WHERE user_id = ? AND tag_id = ?';
                        var values = [id, idInterest];
                        connection_10.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while inserting the tag'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                delInterest_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'Tags successfully set' })];
            case 3:
                error_11 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error occurred while inserting the tag' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setAllInfosSet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_11, updatedDescription, error_12;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_11 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'UPDATE user SET all_infos_set = true WHERE id = ?;';
                        connection_11.query(insertQuery, id, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while setting all_infos_set'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                updatedDescription = _b.sent();
                return [2 /*return*/, res.json({ message: 'all_infos_set successfully set' })];
            case 3:
                error_12 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error occurred while setting all_infos_set' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, username, connection_12, searchUsernameQuery_1, searchUsername, updateUsernameQuery_1, updateUsername_1, error_13;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                username = req.body.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_12 = connectionDb_1.getConnection();
                searchUsernameQuery_1 = 'SELECT COUNT(*) AS count FROM user WHERE username = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_12.query(searchUsernameQuery_1, [username], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating username'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                searchUsername = _b.sent();
                if (searchUsername[0].count !== 0) {
                    return [2 /*return*/, res.status(409).json({ error: 'Error: Username already taken' })];
                }
                updateUsernameQuery_1 = 'UPDATE user SET username = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_12.query(updateUsernameQuery_1, [username, id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating username'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 3:
                updateUsername_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'Username updated' })];
            case 4:
                error_13 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error occurred while updating username' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateFirstName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, firstName, connection_13, updateUsernameQuery_2, updateFirstName_1, error_14;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                firstName = req.body.firstName;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_13 = connectionDb_1.getConnection();
                updateUsernameQuery_2 = 'UPDATE user SET firstName = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_13.query(updateUsernameQuery_2, [firstName, id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating First Name'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                updateFirstName_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'First Name updated' })];
            case 3:
                error_14 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error occurred while updating First Name' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateLastName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lastName, connection_14, updateUsernameQuery_3, updateLastName_1, error_15;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                lastName = req.body.lastName;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_14 = connectionDb_1.getConnection();
                updateUsernameQuery_3 = 'UPDATE user SET lastName = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_14.query(updateUsernameQuery_3, [lastName, id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating Last Name'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                updateLastName_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'Last Name updated' })];
            case 3:
                error_15 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error occurred while updating Last Name' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, connection_15, updateUsernameQuery_4, updateEmail_1, error_16;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                email = req.body.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_15 = connectionDb_1.getConnection();
                updateUsernameQuery_4 = 'UPDATE user SET email = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_15.query(updateUsernameQuery_4, [email, id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating email'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                updateEmail_1 = _b.sent();
                return [2 /*return*/, res.json({ message: 'Email updated' })];
            case 3:
                error_16 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error occurred while updating email' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, connection_16, hashedPassword_1, updateUsernameQuery_5, error_17;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                password = req.body.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_16 = connectionDb_1.getConnection();
                return [4 /*yield*/, argon2_1["default"].hash(password)];
            case 2:
                hashedPassword_1 = _b.sent();
                updateUsernameQuery_5 = 'UPDATE user SET password = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_16.query(updateUsernameQuery_5, [hashedPassword_1, id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating password'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'Password updated' })];
            case 4:
                error_17 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error occurred while updating password' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, location, connection_17, updateLocationQuery_1, updatedLocation, error_18;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                location = req.body.location;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_17 = connectionDb_1.getConnection();
                if (!location) {
                    return [2 /*return*/, res.status(400).json({ message: 'Location must be provided' })];
                }
                updateLocationQuery_1 = 'UPDATE user SET location = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_17.query(updateLocationQuery_1, [location, id], function (changeLocationhErr, changeBirth) {
                            if (changeLocationhErr) {
                                reject(new Error('An error occurred while adding the birth date'));
                            }
                            else {
                                resolve(changeBirth);
                            }
                        });
                    })];
            case 2:
                updatedLocation = _b.sent();
                return [2 /*return*/, res.json({ message: 'Location successfully set' })];
            case 3:
                error_18 = _b.sent();
                console.error('Error updating user\'s location:', error_18);
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while updating location' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, toHash, connection_18, hashedTokenVerify_1, updateLocationQuery_2, transporter_1, mailOptions_1, error_19;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                email = req.query.email;
                toHash = id + new Date().toISOString();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                connection_18 = connectionDb_1.getConnection();
                return [4 /*yield*/, argon2_1["default"].hash(toHash)];
            case 2:
                hashedTokenVerify_1 = (_b.sent()).replace(/\//g, '');
                updateLocationQuery_2 = 'UPDATE user SET verified_token = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_18.query(updateLocationQuery_2, [hashedTokenVerify_1, id], function (tokenErr, addToken) {
                            if (tokenErr) {
                                reject(new Error('An error occurred while adding the token verify'));
                            }
                            else {
                                resolve(addToken);
                            }
                        });
                    })];
            case 3:
                _b.sent();
                transporter_1 = nodemailer_1["default"].createTransport({
                    host: 'smtp-relay.brevo.com',
                    port: 587,
                    auth: {
                        user: 'flirtopia@outlook.com',
                        pass: process.env.MAIL_PASS
                    }
                });
                mailOptions_1 = {
                    from: 'flirtopia@outlook.com',
                    to: email,
                    subject: 'Verify your flirtopia account',
                    text: "Verify your email: http://" + process.env.IP_BACK + ":" + process.env.BACK_PORT + "/verifyTokenAccount/" + hashedTokenVerify_1
                };
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        transporter_1.sendMail(mailOptions_1, function (error, info) {
                            if (error) {
                                reject(new Error('An error occurred while sending the verification email'));
                            }
                            else {
                                resolve(info);
                            }
                        });
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'Token verify successfully set' })];
            case 5:
                error_19 = _b.sent();
                console.error('Error updating user\'s token verify:', error_19);
                return [2 /*return*/, res.status(500).json({ message: 'An error occurred while setting the token' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getSuggestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function getAge(user) {
        var birth = new Date(user.birth);
        var currentDate = new Date();
        var differenceInMillisec = currentDate - birth;
        var age = differenceInMillisec / (1000 * 60 * 60 * 24 * 365.25);
        return Math.floor(age);
    }
    function geographicalScore(user) {
        var dist = userUtils_1.calculateDistance(activeUser_1.location, user.location);
        if (dist <= 50) {
            user.note += 10;
        }
        else if (dist <= 100) {
            user.note += 8;
        }
        else if (dist <= 150) {
            user.note += 6;
        }
        else if (dist <= 200) {
            user.note += 4;
        }
        else {
            user.note += 2;
        }
    }
    function popularityScore(user) {
        if (user.popularity <= 50) {
            user.note += 1;
        }
        else if (user.popularity <= 100) {
            user.note += 3;
        }
        else if (user.popularity <= 150) {
            user.note += 4;
        }
        else if (user.popularity <= 200) {
            user.note += 5;
        }
        else if (user.popularity <= 250) {
            user.note += 6;
        }
        else if (user.popularity <= 300) {
            user.note += 7;
        }
        else if (user.popularity <= 350) {
            user.note += 8;
        }
        else if (user.popularity <= 400) {
            user.note += 9;
        }
        else if (user.popularity <= 450) {
            user.note += 10;
        }
        else {
            user.note += 13;
        }
    }
    function findCommonTags(tags1, tags2) {
        var tags1Ids = tags1.map(function (tag) { return tag.tag_id; });
        var commonTags = tags2.filter(function (tag) { return tags1Ids.includes(tag); });
        return commonTags.length;
    }
    function tagScore(user) {
        return __awaiter(this, void 0, void 0, function () {
            var tagsQuery, actualUserTags, commonTags, gradeNote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagsQuery = 'SELECT user_tag.tag_id FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id WHERE user.id = ?';
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                connection_19.query(tagsQuery, id, function (checkTagErr, checkTagResults) {
                                    if (checkTagErr) {
                                        reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                                    }
                                    else {
                                        resolve(checkTagResults);
                                    }
                                });
                            })];
                    case 1:
                        actualUserTags = _a.sent();
                        commonTags = findCommonTags(actualUserTags, user.interests);
                        user.commonTags = commonTags;
                        gradeNote = [0, 2, 4, 6, 8, 10];
                        user.note += gradeNote[commonTags];
                        return [2 /*return*/];
                }
            });
        });
    }
    var id, maxDistance, differencePopularity, ageFrom, ageTo, interests, interestsNumber, query_1, connection_19, users_3, activeUser_1, myGender_1, myPreference_1, filteredPreferenceUsers, filteredLocationUsers, filteredPopularityUsers, filteredAgeUsers, checkTagsQuery_2, _loop_2, _i, filteredAgeUsers_1, user, filteredInterestsUsers, _a, filteredInterestsUsers_1, user, retArray, filterArray, likedQuery_1, likedUsers_1, removeLikedUserArray, blockedQuery_1, blockedUsers_1, removeBlockedUserArray, secondBlockedQuery_1, secondBlockedUsers_1, removeSecondBlockedUserArray, finalArray, error_20;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
                maxDistance = req.query.maxDistance;
                differencePopularity = req.query.differencePopularity;
                ageFrom = req.query.ageFrom;
                ageTo = req.query.ageTo;
                interests = req.query.interests;
                if (interests) {
                    interestsNumber = interests.map(function (interest) { return parseInt(interest, 10); });
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 14, , 15]);
                query_1 = 'SELECT id, gender, preference, location, birth, popularity FROM user';
                connection_19 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_19.query(query_1, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                users_3 = _c.sent();
                activeUser_1 = users_3.find(function (user) { return user.id === id; });
                myGender_1 = activeUser_1.gender;
                myPreference_1 = activeUser_1.preference;
                filteredPreferenceUsers = users_3.filter(function (user) {
                    if (myGender_1 === "man" && myPreference_1 === "woman") {
                        return (user.gender === "woman" && (user.preference === "man" || user.preference === "both"));
                    }
                    else if (myGender_1 === "woman" && myPreference_1 === "man") {
                        return (user.gender === "man" && (user.preference === "woman" || user.preference === "both"));
                    }
                    else if (myGender_1 === "woman" && myPreference_1 === "both") {
                        return (user.gender === "woman" && (user.preference === "woman" || user.preference === "both")) || (user.gender === "man" && (user.preference === "woman" || user.preference === "both"));
                    }
                    else if (myGender_1 === "man" && myPreference_1 === "both") {
                        return (user.gender === "woman" && (user.preference === "man" || user.preference === "both")) || (user.gender === "man" && (user.preference === "man" || user.preference === "both"));
                    }
                    else if (myGender_1 === "man" && myPreference_1 === "man") {
                        return (user.gender === "man" && (user.preference === "man" || user.preference === "both"));
                    }
                    else if (myGender_1 === "woman" && myPreference_1 === "woman") {
                        return (user.gender === "woman" && (user.preference === "woman" || user.preference === "both"));
                    }
                });
                filteredLocationUsers = filteredPreferenceUsers.filter(function (user) {
                    return (userUtils_1.calculateDistance(activeUser_1.location, user.location) <= maxDistance);
                });
                filteredPopularityUsers = filteredLocationUsers.filter(function (user) {
                    return (user.popularity >= (activeUser_1.popularity - differencePopularity) &&
                        user.popularity <= (activeUser_1.popularity + differencePopularity));
                });
                filteredAgeUsers = filteredPopularityUsers.filter(function (user) {
                    var age = getAge(user);
                    return (age >= ageFrom && age <= ageTo);
                });
                checkTagsQuery_2 = 'SELECT user_tag.tag_id FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id WHERE user.id = ?';
                _loop_2 = function (user) {
                    var tags;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    connection_19.query(checkTagsQuery_2, user.id, function (checkTagErr, checkTagResults) {
                                        if (checkTagErr) {
                                            reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                                        }
                                        else {
                                            resolve(checkTagResults);
                                        }
                                    });
                                })];
                            case 1:
                                tags = _a.sent();
                                user.interests = tags.map(function (tag) { return tag.tag_id; });
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, filteredAgeUsers_1 = filteredAgeUsers;
                _c.label = 3;
            case 3:
                if (!(_i < filteredAgeUsers_1.length)) return [3 /*break*/, 6];
                user = filteredAgeUsers_1[_i];
                return [5 /*yield**/, _loop_2(user)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                filteredInterestsUsers = void 0;
                if (interests) {
                    filteredInterestsUsers = filteredAgeUsers.filter(function (user) {
                        return interestsNumber.every(function (interest) { return user.interests.includes(interest); });
                    });
                }
                else {
                    filteredInterestsUsers = filteredAgeUsers;
                }
                _a = 0, filteredInterestsUsers_1 = filteredInterestsUsers;
                _c.label = 7;
            case 7:
                if (!(_a < filteredInterestsUsers_1.length)) return [3 /*break*/, 10];
                user = filteredInterestsUsers_1[_a];
                user.note = 0;
                geographicalScore(user);
                popularityScore(user);
                return [4 /*yield*/, tagScore(user)];
            case 8:
                _c.sent();
                _c.label = 9;
            case 9:
                _a++;
                return [3 /*break*/, 7];
            case 10:
                retArray = filteredInterestsUsers.map(function (obj) { return ({
                    id: obj.id,
                    commonTags: obj.commonTags,
                    note: obj.note
                }); });
                filterArray = retArray.filter(function (user) { return user.id !== id; });
                likedQuery_1 = 'SELECT * FROM likes WHERE id_user_source = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_19.query(likedQuery_1, activeUser_1.id, function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 11:
                likedUsers_1 = _c.sent();
                removeLikedUserArray = filterArray.filter(function (item) {
                    return !likedUsers_1.some(function (likedUser) { return likedUser.id_user_target === item.id; });
                });
                blockedQuery_1 = 'SELECT * FROM blockUser WHERE id_user_source = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_19.query(blockedQuery_1, activeUser_1.id, function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 12:
                blockedUsers_1 = _c.sent();
                removeBlockedUserArray = removeLikedUserArray.filter(function (item) {
                    return !blockedUsers_1.some(function (likedUser) { return likedUser.id_user_target === item.id; });
                });
                secondBlockedQuery_1 = 'SELECT * FROM blockUser WHERE id_user_target = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_19.query(secondBlockedQuery_1, activeUser_1.id, function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la recuperation des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 13:
                secondBlockedUsers_1 = _c.sent();
                removeSecondBlockedUserArray = removeBlockedUserArray.filter(function (item) {
                    return !secondBlockedUsers_1.some(function (likedUser) { return likedUser.id_user_source === item.id; });
                });
                removeSecondBlockedUserArray.sort(function (a, b) { return b.note - a.note; });
                finalArray = removeSecondBlockedUserArray.slice(0, 200);
                finalArray.sort(function (a, b) { return a.id - b.id; });
                return [2 /*return*/, res.json(finalArray)];
            case 14:
                error_20 = _c.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error retrieving suggestions' })];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.getTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_20, query_2, tags, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_20 = connectionDb_1.getConnection();
                query_2 = 'SELECT * FROM tag';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_20.query(query_2, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                tags = _a.sent();
                return [2 /*return*/, res.json(tags)];
            case 2:
                error_21 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error while retrieving tags' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRelation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, connection_21, query_3, relation, error_22;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                userId = req.params.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_21 = connectionDb_1.getConnection();
                query_3 = 'SELECT * FROM likes WHERE (id_user_source = ? AND id_user_target = ?) \
		OR (id_user_source = ? AND id_user_target = ?)';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_21.query(query_3, [id, userId, userId, id], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                relation = _b.sent();
                return [2 /*return*/, res.json(relation)];
            case 3:
                error_22 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getConversationsByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_22, query_4, conversations, conversationIdMap_1, resultat, error_23;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_22 = connectionDb_1.getConnection();
                query_4 = 'SELECT\
		c.conversation_id,\
		c.user1_id,\
		c.user2_id,\
		c.creation_date,\
		pm.message_id AS last_message_id,\
		pm.sender_id AS last_message_sender_id,\
		pm.recipient_id AS last_message_recipient_id,\
		pm.message_content AS last_message_content,\
		pm.timestamp AS last_message_timestamp\
		FROM\
		conversations AS c\
		LEFT JOIN\
		privateMessages AS pm ON c.conversation_id = pm.conversation_id\
		AND pm.timestamp = (\
			SELECT MAX(timestamp) FROM privateMessages WHERE conversation_id = c.conversation_id\
		)\
		WHERE\
		c.user1_id = ? OR c.user2_id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_22.query(query_4, [id, id], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                conversations = _b.sent();
                conversationIdMap_1 = new Map();
                resultat = conversations.reduce(function (acc, objet) {
                    if (!conversationIdMap_1.has(objet.conversation_id)) {
                        conversationIdMap_1.set(objet.conversation_id, true);
                        acc.push(objet);
                    }
                    return acc;
                }, []);
                return [2 /*return*/, res.json(resultat)];
            case 3:
                error_23 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getConversationById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, convId, connection_23, query_5, conversation, error_24;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                convId = req.params.convId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_23 = connectionDb_1.getConnection();
                query_5 = 'SELECT * FROM conversations WHERE conversation_id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_23.query(query_5, convId, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                conversation = _b.sent();
                return [2 /*return*/, res.json(conversation[0])];
            case 3:
                error_24 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMessagesById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, convId, connection_24, query_6, messages, error_25;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                convId = req.params.convId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_24 = connectionDb_1.getConnection();
                query_6 = 'SELECT privateMessages.conversation_id, privateMessages.sender_id, privateMessages.recipient_id, privateMessages.message_content, privateMessages.timestamp FROM privateMessages WHERE privateMessages.conversation_id = ? ORDER BY PrivateMessages.timestamp';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_24.query(query_6, convId, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                messages = _b.sent();
                return [2 /*return*/, res.json(messages)];
            case 3:
                error_25 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLastMessageById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, convId, connection_25, query_7, message, error_26;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                convId = req.params.convId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_25 = connectionDb_1.getConnection();
                query_7 = 'SELECT message_content FROM privateMessages WHERE conversation_id = ? ORDER BY timestamp DESC LIMIT 1;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_25.query(query_7, convId, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                message = _b.sent();
                return [2 /*return*/, res.json(message[0])];
            case 3:
                error_26 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateNotificationsMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, notifications, connection_26, query_8, message, _loop_3, _i, notifications_1, notif, error_27;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                notifications = req.body.notifications;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                connection_26 = connectionDb_1.getConnection();
                query_8 = 'DELETE FROM notificationsMessages WHERE user_id = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_26.query(query_8, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                message = _b.sent();
                _loop_3 = function (notif) {
                    var query_9;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                query_9 = 'INSERT INTO notificationsMessages (user_id, conversation_id, message_content)\
			VALUES (?, ?, ?);';
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        connection_26.query(query_9, [id, notif.conversation_id, notif.message_content], function (err, results) {
                                            if (err) {
                                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                                            }
                                            else {
                                                resolve(results);
                                            }
                                        });
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, notifications_1 = notifications;
                _b.label = 3;
            case 3:
                if (!(_i < notifications_1.length)) return [3 /*break*/, 6];
                notif = notifications_1[_i];
                return [5 /*yield**/, _loop_3(notif)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, res.json({ message: 'OK' })];
            case 7:
                error_27 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getNotificationsMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_27, query_10, notifications, combinedBlockedQuery_1, blockedUsers_2, removeBlockedUserArray, error_28;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_27 = connectionDb_1.getConnection();
                query_10 = 'SELECT * FROM notificationsMessages WHERE user_id = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_27.query(query_10, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                notifications = _b.sent();
                combinedBlockedQuery_1 = 'SELECT * FROM blockUser WHERE id_user_source = ? OR id_user_target = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_27.query(combinedBlockedQuery_1, [id, id], function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la récupération des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 3:
                blockedUsers_2 = _b.sent();
                removeBlockedUserArray = notifications.filter(function (item) {
                    return !blockedUsers_2.some(function (blockedUser) {
                        return blockedUser.id_user_source === item.user_id ||
                            blockedUser.id_user_target === item.user_id;
                    });
                });
                return [2 /*return*/, res.json(removeBlockedUserArray)];
            case 4:
                error_28 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getNotifications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_28, query_11, notifications, combinedBlockedQuery_2, blockedUsers_3, removeBlockedUserArray, error_29;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_28 = connectionDb_1.getConnection();
                query_11 = 'SELECT * FROM notifications WHERE user_target_id = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_28.query(query_11, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                notifications = _b.sent();
                combinedBlockedQuery_2 = 'SELECT * FROM blockUser WHERE id_user_source = ? OR id_user_target = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_28.query(combinedBlockedQuery_2, [id, id], function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la récupération des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 3:
                blockedUsers_3 = _b.sent();
                removeBlockedUserArray = notifications.filter(function (item) {
                    return !blockedUsers_3.some(function (blockedUser) {
                        return blockedUser.id_user_source === item.user_source_id ||
                            blockedUser.id_user_target === item.user_source_id;
                    });
                });
                return [2 /*return*/, res.json(removeBlockedUserArray)];
            case 4:
                error_29 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getLikes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_29, query_12, likes, combinedBlockedQuery_3, blockedUsers_4, removeBlockedUserArray, error_30;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_29 = connectionDb_1.getConnection();
                query_12 = 'SELECT * FROM likes WHERE id_user_target = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_29.query(query_12, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                likes = _b.sent();
                combinedBlockedQuery_3 = 'SELECT * FROM blockUser WHERE id_user_source = ? OR id_user_target = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_29.query(combinedBlockedQuery_3, [id, id], function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la récupération des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 3:
                blockedUsers_4 = _b.sent();
                removeBlockedUserArray = likes.filter(function (item) {
                    return !blockedUsers_4.some(function (blockedUser) {
                        return blockedUser.id_user_source === item.id_user_source ||
                            blockedUser.id_user_target === item.id_user_source;
                    });
                });
                return [2 /*return*/, res.json(removeBlockedUserArray)];
            case 4:
                error_30 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_30, query_13, history_1, combinedBlockedQuery_4, blockedUsers_5, removeBlockedUserArray, error_31;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_30 = connectionDb_1.getConnection();
                query_13 = 'SELECT * FROM history WHERE id_user_target = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_30.query(query_13, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                history_1 = _b.sent();
                combinedBlockedQuery_4 = 'SELECT * FROM blockUser WHERE id_user_source = ? OR id_user_target = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_30.query(combinedBlockedQuery_4, [id, id], function (checkTagErr, checkTagResults) {
                            if (checkTagErr) {
                                reject(new Error('Une erreur est survenue lors de la récupération des tags'));
                            }
                            else {
                                resolve(checkTagResults);
                            }
                        });
                    })];
            case 3:
                blockedUsers_5 = _b.sent();
                removeBlockedUserArray = history_1.filter(function (item) {
                    return !blockedUsers_5.some(function (blockedUser) {
                        return blockedUser.id_user_source === item.id_user_source ||
                            blockedUser.id_user_target === item.id_user_source;
                    });
                });
                return [2 /*return*/, res.json(removeBlockedUserArray)];
            case 4:
                error_31 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.setReadNotifications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_31, query_14, error_32;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_31 = connectionDb_1.getConnection();
                query_14 = 'UPDATE notifications SET is_read = true WHERE user_target_id = ?;';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_31.query(query_14, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'OK' })];
            case 3:
                error_32 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.reportUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idUserBlock, connection_32, query_15, error_33;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                idUserBlock = req.body.idUserBlock;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                connection_32 = connectionDb_1.getConnection();
                query_15 = 'INSERT INTO reportUser (id_user_source, id_user_target)\
			VALUES (?, ?);';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_32.query(query_15, [id, idUserBlock], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, db_1.updatePopularityScore(idUserBlock, -25)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'OK' })];
            case 4:
                error_33 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getBlockList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection_33, query_16, blockList, error_34;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_33 = connectionDb_1.getConnection();
                query_16 = 'SELECT id_user_target FROM blockUser WHERE id_user_source = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_33.query(query_16, id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                blockList = _b.sent();
                return [2 /*return*/, res.json(blockList)];
            case 3:
                error_34 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.delBlockUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idUserBlock, connection_34, error_35;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                idUserBlock = req.body.idUserBlock;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_34 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'DELETE FROM blockUser WHERE id_user_source = ? AND id_user_target = ?';
                        var values = [id, idUserBlock];
                        connection_34.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'OK' })];
            case 3:
                error_35 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMutualBlockCheck = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idUser, connection_35, query_17, blockList, error_36;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                idUser = req.params.idUser;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                connection_35 = connectionDb_1.getConnection();
                query_17 = 'SELECT * FROM blockUser WHERE id_user_source = ? AND id_user_target = ? OR \
		id_user_target = ? AND id_user_source = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_35.query(query_17, [id, idUser, id, idUser], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                blockList = _b.sent();
                return [2 /*return*/, res.json(blockList)];
            case 3:
                error_36 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
// flirtopia@outlook.com
// Matcha42
// https://app.brevo.com
