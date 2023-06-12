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

const verificarAntesDeAtualizarConta = (req, res, next) => {
    const { cpf, email } = req.body;
    const { numeroConta } = req.params;

    const usuaruioEncontrado = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            mensagem: `nenhuma informação fornecida para atualizar`
        });
    };

    if (!usuaruioEncontrado) {
        return res.status(400).json({
            mensagem: `usuário inválido!`
        });
    };

    if (usuaruioEncontrado.usuario.cpf !== cpf) {

        const cpfFiltrado = contas.filter((conta) => {
            return conta.usuario.cpf === cpf;
        });

        if (cpfFiltrado.length > 0) {
            return res.status(400).json({
                mensagem: `cpf informado já pertence a outro correntista cadastrado`
            });
        };
    };

    if (usuaruioEncontrado.usuario.email !== email) {
        const emailFiltrado = contas.filter((conta) => {
            return conta.usuario.email === email;
        });
        if (emailFiltrado.length > 0) {
            return res.status(400).json({
                mensagem: `email informado já pertence a outro correntista cadastrado`
            });
        };
    };

    next();

};

const verificarAntesDeExcluirConta = (req, res, next) => {
    const { numeroConta } = req.params;

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(400).json({
            mensagem: `conta inválida`
        });
    };

    if (contaEncontrada.saldo !== 0) {
        return res.status(400).json({
            mensagem: `só é possível excluir uma conta quando não houver saldo`
        });
    };

    next();
};

const verificarAntesDeDepositar = (req, res, next) => {

    const { numeroConta, valorDeposito } = req.body

    if (!numeroConta) {
        return res.status(400).json({
            mensagem: `é obrigatório informar numero da conta`
        })
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(400).json({
            mensagem: `numero de conta inválido`
        });
    };

    if (!valorDeposito || Number(valorDeposito) < 1) {
        return res.status(400).json({
            mensagem: `valor do depósito inválido`
        });
    };

    next();

};

const verificarAntesDeSacar = (req, res, next) => {

    const { numeroConta, valorSaque } = req.body;

    if (!numeroConta || !valorSaque) {
        return res.status(400).json({
            mensagem: `é obrigatório informar numero da conta e valor do saque`
        });
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(400).json({
            mensagem: `numero de conta inválido`
        });
    };

    if (!valorSaque || Number(valorSaque) < 1) {
        return res.status(400).json({
            mensagem: `valor do saque inválido`
        });
    };

    if (Number(contaEncontrada.saldo) < valorSaque) {
        return res.status(400).json({
            mensagem: `não há saldo suficiente para o saque`
        });
    };

    next();
};

const verificarAntesDeTransferir = (req, res, next) => {
    const { numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
        senhaContaOrigem
    } = req.body;

    //Verificação da conta de origem
    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaOrigem;
    });

    if (!contaOrigemEncontrada) {
        return res.status(400).json({
            mensagem: `numero de conta de origem inválido`,
        });
    };

    //Verificação da conta de destino
    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaDestino;
    });

    if (!contaDestinoEncontrada) {
        return res.status(400).json({
            mensagem: `numero de conta de destino inválido`
        });
    };

    if (contaDestinoEncontrada === contaOrigemEncontrada) {
        return res.status(400).json({
            mensagem: `conta de origem e conta de destino são a mesma conta`
        });
    };

    //Verificação do valor da transferência
    if (Number(valorTransferencia) < 1) {
        return res.status(400).json({
            mensagem: `valor da transferência inválido`
        });
    };

    //Verificação do saldo da conta de origem
    if (Number(contaOrigemEncontrada.saldo) < valorTransferencia) {
        return res.status(400).json({
            mensagem: `não há saldo suficiente para a transferência`
        });
    };

    //Verificação da senha da conta de origem
    if (contaOrigemEncontrada.usuario.senha !== senhaContaOrigem) {
        return res.status(400).json({
            mensagem: `senha da conta de origem incorreta`
        });
    };

    next();

};

module.exports = {
    verificarSenhaBanco,
    verificarSenhaUsuarioQueryParams,
    verificarAntesDeAtualizarConta,
    verificarAntesDeExcluirConta,
    verificarAntesDeDepositar,
    verificarSenhaUsuarioNoBody,
    verificarAntesDeSacar,
    verificarAntesDeTransferir
};