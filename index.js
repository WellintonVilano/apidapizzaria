//Atualizar o index.js
//1 - Importar a ferramenta 

import express from 'express'

//Cria a nossa aplicação (nosso servidor)
const app = express();
//Habilita o Express para entender o formato JSON no corpo das requisições 
app.use(express.json());

//Define a porta em que o servidor vai executar os pedidos 
const PORTA = 3333;

//Manda o servidor ficar "esutando" na porta definida
app.listen(PORTA, () => {
    console.log(`Servidor rotando na porta ${PORTA}, Acesse http://localhost:${PORTA}`);
});

//Rota principal da aplicação 

app.get('/', (request, response) => {
    //req = Requisição (dados do pedido do cliente)
    //resp = Resposta (o que vamos enviar de volta)

    //estamos enviando uma respota no formato JSON
    response.json({ message: "Bem-vindo á API da Pizzaria Senac!" });
});

//Manda o servidor ficar "Escutando" na porta definida

//Seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    { id: 1, nome: "João Maria", email: "joao.silva@example.com" },
    { id: 2, nome: "Maria Santos", email: "maria.santos@example.com" },
    { id: 3, nome: "Pedro Almeida", email: "pedro.almeida@example.com" }
];

//rota para listar TODOS os clientes (seu código original)
app.get('/clientes', (req, res) => {
    res.json(listaDeClientes);
});

//Nova rota 
app.get('/clientes/:id', (req, res) => {
    //Captura o ID da URL e converte para número
    const idDoCliente = parseInt(req.params.id);
    //Procura o cliente no array usando método find()
    const cliente = listaDeClientes.find(c => c.id === idDoCliente);
    //Verifica se o cliente foi encontrado
    if (cliente) {
        //se encontrou, retorna o cliente com status 200 (OK)
        res.json(cliente);
    } else {
        //se nao encontrou, retorna um erro 404 (Not found)
        res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
});

//Rota para criar um novo cliente

app.post('/clientes', (req, res) => {
    //O middleware express.json() pega o corpo da requisição e o coloca em req.body
    const novoCliente = req.body;

    console.log("Recebemos um novo cliente:", novoCliente);

    res.json({ message: `Cliente ${novoCliente, nome} cadastrado com sucesso!`, data: novoCliente });
});