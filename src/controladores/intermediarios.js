const express = require(`express`)
const { banco, contas } = require(`../bancodedados`);


const verificarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({
            mensagem: `senha não informada!`
        });
    };
    if (senha_banco !== banco.senha) {
        return res.status(400).json({
            mensagem: `senha incorreta!`
        });
    };

    next();
};

const verificarSenhaUsuarioNoBody = (req, res, next) => {

    const { numeroConta, senha } = req.body

    const usuaruioEncontrado = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!usuaruioEncontrado) {
        return res.status(400).json({
            mensagem: `usuário inválido!`
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: `senha não informada!`
        });
    };

    if (senha !== usuaruioEncontrado.usuario.senha) {
        return res.status(400).json({
            mensagem: `senha de usuário incorreta`
        });
    };

    next();
};

const verificarSenhaUsuarioQueryParams = (req, res, next) => {
    const senha = req.query.senha
    let numeroConta = ``

    if (req.query.numero_conta) {
        numeroConta = req.query.numero_conta;
    };

    if (req.params.numeroConta) {
        numeroConta = req.params.numeroConta;
    };

    const usuaruioEncontrado = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!usuaruioEncontrado) {
        return res.status(400).json({
            mensagem: `usuário inválido!`
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: `senha não informada!`
        });
    };

    if (senha !== usuaruioEncontrado.usuario.senha) {
        return res.status(400).json({
            mensagem: `senha de usuário incorreta`
        });
    };


    next();

};

module.exports = {
    verificarSenhaBanco,
    verificarSenhaUsuarioQueryParams,
    verificarSenhaUsuarioNoBody
};