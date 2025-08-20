const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DB_FILE = './db.json';

app.use(cors());
app.use(express.json());

//Leitura do arquivo db.json
const lerDados = () => {
    try {
        const dados = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(dados);
    } catch (error) {
        console.error("Erro ao ler o arquivo db.json");
        return [];
    }
};

//Escreve os dados no arquivo db.json
const salvarDados = (dados) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(dados, null, 2));
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
    }
};

//Validações
const validaInvestimento = (investimentos) => {
    if (!investimentos.nome || !investimentos.tipo || !investimentos.valor || !investimentos.data) {
        return "Todos os campos são obrigatórios!";
    }
    if (parseFloat(investimentos.valor) <= 0) {
        return "O valor do investimento deve ser maior que zero!";
    }
    if(new Date(investimentos.data) > new Date()) {
        return "A data do investimento não pode ser no futuro";
    }
    return null;
}

//Rotas
//READ
app.get('/investimentos', (req, res) => {
    const investimentos = lerDados();
    res.status(200).json(investimentos);
});

//CREATE
app.post('/investimentos', (req, res) => {
    const investimentos = lerDados();
    const novoInvestimento = req.body;

    const erro = validaInvestimento(novoInvestimento);
    if (erro) {
        return res.status(400).json({ message: erro });
    }

    const ultimoId = investimentos.length > 0 ? Math.max(...investimentos.map(inv => inv.id)) : 0;
    novoInvestimento.id = ultimoId + 1;
    investimentos.push(novoInvestimento);
    salvarDados(investimentos);
    res.status(201).json(novoInvestimento);
});

//UPDATE
app.put('/investimentos/:id', (req, res) => {
    const investimentos = lerDados();
    const id = parseInt(req.params.id);
    const dataAtualizada = req.body;

    const erro = validaInvestimento(dataAtualizada);
    if (erro) {
        return res.status(400).json({ message: erro });
    }

    const index = investimentos.findIndex(inv => inv.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Investimento não encontrado!" });
    }

    investimentos[index] = { ...investimentos[index], ...dataAtualizada };
    salvarDados(investimentos);
    res.status(200).json(investimentos[index]);
});

//DELETE
app.delete('/investimentos/:id', (req, res) => {
    let investimentos = lerDados();
    const id = parseInt(req.params.id);
    const index = investimentos.findIndex(inv => inv.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Investimento não encontrado!" });
    }

    investimentos = investimentos.filter(inv => inv.id !== id);
    salvarDados(investimentos);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});