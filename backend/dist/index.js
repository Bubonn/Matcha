"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./services/db");
const token_1 = require("./utils/token");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.createConnection)();
app.use('/login', login_1.default);
app.use(token_1.authenticateToken);
app.use('/users', user_1.default);
app.use('/uploads', uploads_1.default);
app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
// mysql> INSERT INTO tag (tag_name) VALUES
//     -> ('Sport'), ('Music'),('Travel'),('Movies'),('TV shows'),('Reading'),
// 	('Cooking'),('Art'),('Fitness'),('Gaming'),('Dancing'),('Technology'),
// 	('Photography'), ('Running'),('Pets'),('Nature'),('Sciences'),('Cars'),('42')
// mysql> create table user_tag ( 
// 	user_id INT, tag_id INT, FOREIGN KEY (user_id) REFERENCES user(id),
// FOREIGN KEY (tag_id) REFERENCES tag(tag_id), PRIMARY KEY (user_id, tag_id));
// mysql> INSERT INTO user_tag (user_id, tag_id) VALUES (1, 3);
// mysql> SELECT * FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id;
