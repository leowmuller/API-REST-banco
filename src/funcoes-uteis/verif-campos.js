const express = require(`express`)
const { contas } = require(`../bancodedados`);
const nodeCPF = require(`node-cpf`);
const validarEmail = require(`email-validator`);


const verificarCPF = (req, res, next) => {

    const cpf = req.body.cpf;
    if (!cpf) {
        return res.status(400).json({
            mensagem: `cpf não informado`
        });
    };

    if (nodeCPF.validate(cpf) === false) {
        return res.status(400).json({
            mensagem: `cpf inválido`
        });
    };

    const cpfFiltrado = contas.filter((conta) => {
        return conta.usuario.cpf === cpf;
    });
    if (cpfFiltrado.length > 0) {
        return res.status(400).json({
            mensagem: `cpf informado já pertence a um correntista cadastrado`
        });
    };
    next();
};

const verificarEmail = (req, res, next) => {

    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            mensagem: `email não informado`
        });
    };

    if (validarEmail.validate(email) === false) {
        return res.status(400).json({
            mensagem: `formato de email inválido`
        });
    };
    const emailFiltrado = contas.filter((conta) => {
        return conta.usuario.email === email;
    });
    if (emailFiltrado.length > 0) {
        return res.status(400).json({
            mensagem: `email informado já pertence a um correntista cadastrado`
        });
    };
    next();
};

const verificarCamposUsuarioPreenchidos = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome) {
        return res.status(400).json({
            mensagem: `nome não informado`
        });
    };

    if (!cpf) {
        return res.status(400).json({
            mensagem: `cpf não informado`
        });
    };

    if (!data_nascimento) {
        return res.status(400).json({
            mensagem: `data_nascimento não informada`
        });
    };

    if (!telefone) {
        return res.status(400).json({
            mensagem: `telefone não informado`
        });
    };

    if (!email) {
        return res.status(400).json({
            mensagem: `email não informado`
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: `senha não informada`
        });
    };

    next();

};

const verificarCamposBodyTransferencias = (req, res, next) => {
    const { numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
        senhaContaOrigem
    } = req.body;

    if (!numeroContaOrigem) {
        return res.status(400).json({
            mensagem: `número da conta de origem não informado`
        });
    };

    if (!numeroContaDestino) {
        return res.status(400).json({
            mensagem: `número da conta de destino não informado`
        });
    };

    if (!valorTransferencia) {
        return res.status(400).json({
            mensagem: `valor da transferência não informado`
        });
    };

    if (!senhaContaOrigem) {
        return res.status(400).json({
            mensagem: `senha da conta de origem não informada`
        });
    };

    next();
};


module.exports = {
    verificarCPF,
    verificarEmail,
    verificarCamposUsuarioPreenchidos,
    verificarCamposBodyTransferencias
};