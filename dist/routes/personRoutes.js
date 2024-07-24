"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/pessoaRoutes.ts
const express_1 = require("express");
const personController_1 = require("../controllers/personController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, personController_1.createPessoa);
router.get('/', auth_1.authenticateToken, personController_1.getPessoas);
router.get('/:id', auth_1.authenticateToken, personController_1.getPessoaById);
router.put('/:id', auth_1.authenticateToken, personController_1.updatePessoa);
router.delete('/:id', auth_1.authenticateToken, personController_1.deletePessoa);
exports.default = router;
