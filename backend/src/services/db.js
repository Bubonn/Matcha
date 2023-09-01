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
exports.addNotifMessage = exports.updatePopularityScore = exports.blockUser = exports.userDisonnected = exports.userConnected = exports.insertHistory = exports.deleteChannel = exports.createChannel = exports.getRelaion = exports.insertNotif = exports.deleteLike = exports.insertLike = exports.insertMessage = void 0;
var connectionDb_1 = require("./connectionDb");
exports.insertMessage = function (conversation_id, message_content, recipient_id, sender_id) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_1, convQuery_1, conv, notFirstMessage, query_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                connection_1 = connectionDb_1.getConnection();
                convQuery_1 = 'SELECT * FROM privateMessages WHERE conversation_id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(convQuery_1, conversation_id, function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                conv = _a.sent();
                notFirstMessage = conv.some(function (obj) {
                    return obj.sender_id === sender_id;
                });
                if (!(conv.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.updatePopularityScore(sender_id, 10)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!!notFirstMessage) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.updatePopularityScore(sender_id, 5)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                query_1 = 'INSERT INTO privateMessages (conversation_id, sender_id, recipient_id, message_content, timestamp) VALUES (?, ?, ?, ?, NOW())';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.query(query_1, [conversation_id, sender_id, recipient_id, message_content], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.insertLike = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_2 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'INSERT INTO likes (id_user_source, id_user_target) VALUES (?, ?)';
                        var values = [id_user_source, id_user_target];
                        connection_2.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while liked user'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteLike = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_3, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_3 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'DELETE FROM likes WHERE id_user_source = ? AND id_user_target = ?';
                        var values = [id_user_source, id_user_target];
                        connection_3.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while dislike user'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.insertNotif = function (id_user_source, id_user_target, notification) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_4, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_4 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'INSERT INTO notifications (user_source_id, user_target_id, notification_type, timestamp)\
				VALUES (?, ?, ?, NOW());';
                        var values = [id_user_source, id_user_target, notification];
                        connection_4.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRelaion = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_5, relation, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_5 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'SELECT * FROM likes WHERE (id_user_source = ? AND id_user_target = ?) \
			OR (id_user_source = ? AND id_user_target = ?)';
                        connection_5.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                relation = _a.sent();
                return [2 /*return*/, relation];
            case 2:
                error_5 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createChannel = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_6, channel, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                connection_6 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'SELECT * FROM conversations WHERE user1_id = ? AND user2_id = ? OR user1_id = ? and user2_id = ?';
                        connection_6.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                channel = _a.sent();
                if (channel.length === 1) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'INSERT INTO Conversations (user1_id, user2_id, creation_date) VALUES (?, ?, NOW())';
                        connection_6.query(query, [id_user_source, id_user_target], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteChannel = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_7, channel, channelId_1, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                connection_7 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'SELECT * FROM conversations WHERE user1_id = ? AND user2_id = ? OR user1_id = ? and user2_id = ?';
                        connection_7.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                channel = _a.sent();
                if (channel.length !== 1) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, exports.updatePopularityScore(id_user_source, -30)];
            case 2:
                _a.sent();
                return [4 /*yield*/, exports.updatePopularityScore(id_user_target, -30)];
            case 3:
                _a.sent();
                channelId_1 = channel[0].conversation_id;
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'DELETE from privateMessages WHERE conversation_id = ?';
                        connection_7.query(query, [channelId_1], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var query = 'DELETE from conversations WHERE conversation_id = ?';
                        connection_7.query(query, [channelId_1], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_7 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.insertHistory = function (id_user_source, id_user_target) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_8, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_8 = connectionDb_1.getConnection();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'INSERT INTO history (id_user_source, id_user_target) VALUES (?, ?)';
                        var values = [id_user_source, id_user_target];
                        connection_8.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error occurred while insert visit'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userConnected = function (idUser) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_9, currentDateTime, localDateTime_1, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_9 = connectionDb_1.getConnection();
                currentDateTime = new Date();
                localDateTime_1 = currentDateTime.toISOString().replace('T', ' ').slice(0, 19);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'UPDATE user SET online = ?, lastConnection = ? WHERE id = ?';
                        var values = [true, localDateTime_1, idUser];
                        connection_9.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête:', error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userDisonnected = function (idUser) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_10, currentDateTime, localDateTime_2, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_10 = connectionDb_1.getConnection();
                currentDateTime = new Date();
                localDateTime_2 = currentDateTime.toISOString().replace('T', ' ').slice(0, 19);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var insertQuery = 'UPDATE user SET online = ?, lastConnection = ? WHERE id = ?';
                        var values = [false, localDateTime_2, idUser];
                        connection_10.query(insertQuery, values, function (error) {
                            if (error) {
                                reject(new Error('Error'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.log('Erreur lors de l\'exécution de la requête:', error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.blockUser = function (id, idUserBlock) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_11, query_2, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, exports.deleteChannel(id, idUserBlock)];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.deleteLike(id, idUserBlock)];
            case 2:
                _a.sent();
                connection_11 = connectionDb_1.getConnection();
                query_2 = 'INSERT INTO blockUser (id_user_source, id_user_target)\
			VALUES (?, ?);';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_11.query(query_2, [id, idUserBlock], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_11 = _a.sent();
                console.log(error_11);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatePopularityScore = function (id, score) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_12, query_3, user, newScore_1, popularityQuery_1, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                connection_12 = connectionDb_1.getConnection();
                query_3 = 'SELECT * FROM user WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_12.query(query_3, [id], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 1:
                user = _a.sent();
                newScore_1 = user[0].popularity + score;
                if (newScore_1 < 0) {
                    newScore_1 = 0;
                }
                else if (newScore_1 > 1000) {
                    newScore_1 = 1000;
                }
                popularityQuery_1 = 'UPDATE user SET popularity = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_12.query(popularityQuery_1, [newScore_1, id], function (err, results) {
                            if (err) {
                                reject(new Error('Erreur lors de l\'exécution de la requête'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.log(error_12);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addNotifMessage = function (id, conversation_id, message_content) { return __awaiter(void 0, void 0, void 0, function () {
    var connection_13, query_4, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                connection_13 = connectionDb_1.getConnection();
                query_4 = 'INSERT INTO notificationsMessages (user_id, conversation_id, message_content)\
		VALUES (?, ?, ?);';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_13.query(query_4, [id, conversation_id, message_content], function (err, results) {
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
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                console.log(error_13);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
