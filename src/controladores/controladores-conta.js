const express = require(`express`);
const { contas } = require(`../bancodedados`);
const {
    verificarCPF,
    verificarEmail,
    verificarCamposUsuarioPreenchidos,
    verificarAntesDeAtualizarConta,
    verificarAntesDeExcluirConta
} = require("../funcoes-uteis/verificadores");


//Rota 1
const listarContas = (req, res) => {
    return res.status(200).json(contas)
};

//Rota 2
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const verifCampos = verificarCamposUsuarioPreenchidos(req.body);
    if (verifCampos) {
        return res.status(400).json(verifCampos);
    };

    const verifCPF = verificarCPF(cpf);
    if (verifCPF) {
        return res.status(400).json(verifCPF);
    };

    const verifEmail = verificarEmail(email);
    if (verifEmail) {
        return res.status(400).json(verifEmail);

    };

    const conta = {
        numero: (contas.length + 1).toString(),
        saldo: 0,
        usuario: { nome, cpf, data_nascimento, telefone, email, senha }
    };

    contas.push(conta);

    return res.status(201).json(conta);

};

//Rota 3
const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            mensagem: `nenhuma informação fornecida para atualizar`
        });
    };

    const verifCPF = verificarCPF(cpf);
    if (verifCPF) {
        return res.status(400).json(verifCPF);
    };

    const verifAtualizacao = verificarAntesDeAtualizarConta(cpf, email, numeroConta);
    if (verifAtualizacao) {
        return res.status(400).json(verifAtualizacao);
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    let nomeAtualizado = contaEncontrada.usuario.nome;
    let cpfAtualizado = contaEncontrada.usuario.cpf;
    let data_nascimentoAualizada = contaEncontrada.usuario.data_nascimento;
    let telefoneAtualizado = contaEncontrada.usuario.telefone;
    let emailAtualizado = contaEncontrada.usuario.email;
    let senhaAtualizda = contaEncontrada.usuario.senha;

    if (nome) {
        nomeAtualizado = nome;
    };

    if (cpf) {
        cpfAtualizado = cpf;
    };

    if (data_nascimento) {
        data_nascimentoAualizada = data_nascimento;
    };

    if (telefone) {
        telefoneAtualizado = telefone;
    };

    if (email) {
        emailAtualizado = email;
    };

    if (senha) {
        senhaAtualizda = senha;
    };

    const { numero, saldo } = contaEncontrada
    const contaAtualizada = {
        numero,
        saldo,
        usuario: {
            nome: nomeAtualizado,
            cpf: cpfAtualizado,
            data_nascimento: data_nascimentoAualizada,
            telefone: telefoneAtualizado,
            email: emailAtualizado,
            senha: senhaAtualizda
        }
    };

    if (contas.indexOf(contaEncontrada) > -1) {
        contas.splice(contas.indexOf(contaEncontrada), 1)
    };

    contas.push(contaAtualizada);

    return res.status(200).json({
        mensagem: `dados atualizados com sucesso`
    });

};

//Rota 4
const deletarContaBancaria = (req, res) => {
    const { numeroConta } = req.params;

    const verifExclusao = verificarAntesDeExcluirConta(numeroConta);
    if (verifExclusao) {
        return res.status(400).json(verifExclusao);
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (contas.indexOf(contaEncontrada) > -1) {
        contas.splice(contas.indexOf(contaEncontrada), 1)
    };

    return res.status(200).json({
        mensagem: "Conta excluída com sucesso!"
    });
};


module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarContaBancaria
};