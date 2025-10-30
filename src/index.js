//Primeira linha do seu projeto. Carrega as variáveis de ambiente antes de qualquer outro código.
import 'dotenv/config';

//Sintaxe de importação para todas as dependências
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; //Necessário para recriar o '__dirname'
import db from './db/db.js'; // excluir depois
import authRoutes from './routes/authRoutes.js'; 
import clienteRoutes from './routes/clienteRoutes.js';

//Configurações 
//Em ESM, '__dirname' não existe nativamente. Este é o padrão moderno para obtê-lo.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//As opções do CORS permanecem as mesmas, estão bem configuradas 
const corsOption = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,PUT,PATCH,DELET',
    credentials: true,
};

const app = express(); //Inicialização do app

//MIDDLEWARE
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());//Habilita o Express para entender o formato JSON no corpo das requisições

//Servindo a pasta 'public' para arquivos esáticos (CSS, JS, imagens).
app.use(express.static(path.join(__dirname, '..', 'public')));

//Rota principal da aplicação 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});

//Rotas da API prefixadas para melhor organização e versionamento.
//Isso evita conflitos e deixa claro quais rotas pertencer á API.
const apiPrefix = '/api';
app.use(`${apiPrefix}/clientes`, clienteRoutes); //ex: /api/clientes/
app.use(`${apiPrefix}/login`, authRoutes); //Rota de login ex:/api/login

//Tratamento de erros
//Um middleware de erro centralizado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

//Inicialização do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//Seus dados mockados (simulando o banco de dados)
// const listaDeClientes = [
//     { id: 1, nome: "João Maria", email: "joao.silva@example.com" },
//     { id: 2, nome: "Maria Santos", email: "maria.santos@example.com" },
//     { id: 3, nome: "Pedro Almeida", email: "pedro.almeida@example.com" }
// ];

// //rota para listar TODOS os clientes (seu código original)
// app.get('/clientes', (req, res) => {
//     res.json(listaDeClientes);
// });

// //Nova rota 
// app.get('/clientes/:id', (req, res) => {
//     //Captura o ID da URL e converte para número
//     const idDoCliente = parseInt(req.params.id);
//     //Procura o cliente no array usando método find()
//     const cliente = listaDeClientes.find(c => c.id === idDoCliente);
//     //Verifica se o cliente foi encontrado
//     if (cliente) {
//         //se encontrou, retorna o cliente com status 200 (OK)
//         res.json(cliente);
//     } else {
//         //se nao encontrou, retorna um erro 404 (Not found)
//         res.status(404).json({ mensagem: "Cliente não encontrado." });
//     }
// });

// //Rota para criar um novo cliente

// app.post('/clientes', (req, res) => {
//     //O middleware express.json() pega o corpo da requisição e o coloca em req.body
//     const novoCliente = req.body;

//     console.log("Recebemos um novo cliente:", novoCliente);

//     res.json({ message: `Cliente ${novoCliente, nome} cadastrado com sucesso!`, data: novoCliente });
// });