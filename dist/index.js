"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todosRoutes_1 = __importDefault(require("./routes/todosRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', todosRoutes_1.default);
app.listen(process.env.PORT || 4000, () => console.log('Connected ah successfully!'));
//# sourceMappingURL=index.js.map