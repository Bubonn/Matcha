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
exports.resetPassword = exports.sendEmailResetPassword = exports.verifyTokenEmail = exports.checkToken = exports.signup = exports.signin = void 0;
var connectionDb_1 = require("../services/connectionDb");
var token_1 = require("../utils/token");
var nodemailer_1 = require("nodemailer");
var argon2_1 = require("argon2");
exports.signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username_1, password, connection_1, sql_1, queryAsync, results, user, storedPassword, isMatch, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, username_1 = _a.username, password = _a.password;
                if (!username_1 || !password) {
                    throw new Error('Missing required parameters');
                }
                connection_1 = connectionDb_1.getConnection();
                sql_1 = 'SELECT * FROM user WHERE username = ?;';
                queryAsync = function () {
                    return new Promise(function (resolve, reject) {
                        connection_1.query(sql_1, username_1, function (err, results) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(results);
                            }
                        });
                    });
                };
                return [4 /*yield*/, queryAsync()];
            case 1:
                results = _b.sent();
                if (!(results.length === 0)) return [3 /*break*/, 2];
                res.status(401).json({ error: 'User not found' });
                return [3 /*break*/, 4];
            case 2:
                user = results[0];
                storedPassword = user.password;
                return [4 /*yield*/, argon2_1["default"].verify(storedPassword, password)];
            case 3:
                isMatch = _b.sent();
                if (isMatch) {
                    token = token_1.generateJWT(user.id);
                    return [2 /*return*/, res.json({ token: token })];
                }
                else {
                    res.status(401).json({ error: 'Incorrect username or password' });
                }
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.status(400).json({ error: error_1.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Verifier les champs aussi dans le back
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, firstName, lastName, password, connection, checkUserQuery, checkUserResult, error_2, hashedPassword, sql, values;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, firstName = _a.firstName, lastName = _a.lastName, password = _a.password;
                if (!email || !username || !firstName || !lastName || !password) {
                    return [2 /*return*/, res.status(401).json({ error: 'Missing required parameters.' })];
                }
                connection = connectionDb_1.getConnection();
                checkUserQuery = 'SELECT * FROM user WHERE username = ?';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection.query(checkUserQuery, username, function (checkUserErr, checkUserResults) {
                            if (checkUserErr) {
                                reject(new Error('Une erreur est survenue lors de la vérification du nom d\'utilisateur.'));
                            }
                            else {
                                resolve(checkUserResults);
                            }
                        });
                    })];
            case 2:
                checkUserResult = _b.sent();
                if (checkUserResult.length > 0) {
                    return [2 /*return*/, res.status(409).json({ error: 'Username already taken.' })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error. Please try again later.' })];
            case 4: return [4 /*yield*/, argon2_1["default"].hash(password)];
            case 5:
                hashedPassword = _b.sent();
                sql = 'INSERT INTO user (email, username, firstName, lastName, password) VALUES (?, ?, ?, ?, ?);';
                values = [email, username, firstName, lastName, hashedPassword];
                connection.query(sql, values, function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: 'Internal error, please try again later' });
                    }
                    var token = token_1.generateJWT(result.insertId);
                    return res.json({ token: token });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.checkToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, secretKey, user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                secretKey = process.env.SECRET_JWT;
                if (!secretKey) {
                    throw new Error('La clé secrète JWT est manquante dans les variables d\'environnement.');
                }
                if (!token) {
                    return [2 /*return*/, res.status(401).json({ error: 'No token provided.' })];
                }
                return [4 /*yield*/, token_1.verifyToken(token, secretKey)];
            case 1:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(403).json({ error: 'Invalid token.' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyTokenEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, connection_2, getUserQuery_1, idUserVerified_1, verifiedQuery_1, tokenJWT, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.query.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                connection_2 = connectionDb_1.getConnection();
                getUserQuery_1 = 'SELECT * FROM user WHERE verified_token = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_2.query(getUserQuery_1, [token], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating password'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                idUserVerified_1 = _a.sent();
                if (idUserVerified_1.length === 0) {
                    return [2 /*return*/, res.status(500).json({ error: 'Error: invalid Token' })];
                }
                verifiedQuery_1 = 'UPDATE user SET verified = TRUE WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_2.query(verifiedQuery_1, idUserVerified_1[0].id, function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating password'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 3:
                _a.sent();
                tokenJWT = token_1.generateJWT(idUserVerified_1[0].id);
                return [2 /*return*/, res.json({ message: 'Your account is now verified', token: tokenJWT })];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error: invalid Token' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendEmailResetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, connection_3, getUserQuery_2, user_1, toHash, hashedTokenVerify_1, query_1, transporter_1, mailOptions_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                connection_3 = connectionDb_1.getConnection();
                getUserQuery_2 = 'SELECT id, email FROM user WHERE email = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_3.query(getUserQuery_2, email, function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating password'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                user_1 = _a.sent();
                if (user_1.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: 'Email not found' })];
                }
                toHash = user_1[0].id + new Date().toISOString();
                return [4 /*yield*/, argon2_1["default"].hash(toHash)];
            case 3:
                hashedTokenVerify_1 = (_a.sent()).replace(/\//g, '');
                query_1 = 'UPDATE user SET password_token = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_3.query(query_1, [hashedTokenVerify_1, user_1[0].id], function (tokenErr, addToken) {
                            if (tokenErr) {
                                reject(new Error('An error occurred while adding the token verify'));
                            }
                            else {
                                resolve(addToken);
                            }
                        });
                    })];
            case 4:
                _a.sent();
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
                    subject: 'Reset your flirtopia password',
                    text: "Reset your password: http://" + process.env.IP_BACK + ":" + process.env.BACK_PORT + "/resetPassword/" + hashedTokenVerify_1
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
            case 5:
                _a.sent();
                return [2 /*return*/, res.json({ message: 'OK' })];
            case 6:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error: invalid Token' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, confPassword, token, connection_4, userQuery_1, user_2, hashedPassword_1, updateUsernameQuery_1, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, confPassword = _a.confPassword, token = _a.token;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                connection_4 = connectionDb_1.getConnection();
                if (password !== confPassword) {
                    return [2 /*return*/, res.status(400).json({ error: 'Passwords must be the same' })];
                }
                userQuery_1 = 'SELECT id FROM user WHERE password_token = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_4.query(userQuery_1, token, function (err, results) {
                            if (err) {
                                reject(new Error('Une erreur est survenue'));
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            case 2:
                user_2 = _b.sent();
                if (user_2.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: 'Wrong token' })];
                }
                return [4 /*yield*/, argon2_1["default"].hash(password)];
            case 3:
                hashedPassword_1 = _b.sent();
                updateUsernameQuery_1 = 'UPDATE user SET password = ? WHERE id = ?';
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_4.query(updateUsernameQuery_1, [hashedPassword_1, user_2[0].id], function (err, results) {
                            if (err) {
                                reject(new Error('Error occurred while updating password'));
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({ message: 'Password updated' })];
            case 5:
                error_6 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Error: invalid Token' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
