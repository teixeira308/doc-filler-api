"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.put('/status', auth_1.authenticateToken, userController_1.updateUserStatus); // Rota para atualizar status do usuário
exports.default = router;
