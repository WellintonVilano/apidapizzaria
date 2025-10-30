import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validate from '../middlewares/validate.js';
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clienteController.js';

import authMiddleware from '../middlewares/authMiddleware.js'; //1. importa o middleware de login.

const router = express.Router();

//A rota de criação de cliente (registro) continua pública
router.post('/', validate(clienteCreateSchema), clienteController.adicionarCliente);
//Rota final: POST /api/clientes

//2. Aplica o middleware em todas as rotas abaixo dessa linha
router.use(authMiddleware);// //descomentar para funcionar

//o caminho base '/api/clientes' já foi definido no index.js
//Agora definimos apenas as partes relativas: '/', '/:cpf', etc.
router.get('/', clienteController.listarClientes); //Rota final: GET /api/clientes
router.get('/:cpf', clienteController.listarClientesCpf); //Rota final: GET /api/clientes/:cpf

router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente); //Rota final: PUT /api/clientes/:cpf
router.delete('/:cpf', clienteController.deletarCliente); //Rota final: DELETE /api/clientes/:cpf

export default router;
