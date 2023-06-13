const express = require(`express`)
const { contas } = require(`../bancodedados`);
const nodeCPF = require(`node-cpf`);
const validarEmail = require(`email-validator`);


const verificarCPF = (cpf) => {
    if (!cpf) {
        return {
            mensagem: `cpf não informado`
        };
    };

    if (nodeCPF.validate(cpf) === false) {
        return {
            mensagem: `cpf inválido`
        };
    };

    const cpfFiltrado = contas.filter((conta) => {
        return conta.usuario.cpf === cpf;
    });
    if (cpfFiltrado.length > 0) {
        return {
            mensagem: `cpf informado já pertence a um correntista cadastrado`
        };
    };

    return null

};

const verificarEmail = (email) => {
    if (!email) {
        return {
            mensagem: `email não informado`
        };
    };

    if (validarEmail.validate(email) === false) {
        return {
            mensagem: `formato de email inválido`
        };
    };
    const emailFiltrado = contas.filter((conta) => {
        return conta.usuario.email === email;
    });
    if (emailFiltrado.length > 0) {
        return {
            mensagem: `email informado já pertence a um correntista cadastrado`
        };
    };

    return null
};

const verificarCamposUsuarioPreenchidos = (body) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = body;

    if (!nome) {
        return {
            mensagem: `nome não informado`
        };
    };

    if (!cpf) {
        return {
            mensagem: `cpf não informado`
        };
    };

    if (!data_nascimento) {
        return {
            mensagem: `data_nascimento não informada`
        };
    };

    if (!telefone) {
        return {
            mensagem: `telefone não informado`
        };
    };

    if (!email) {
        return {
            mensagem: `email não informado`
        };
    };

    if (!senha) {
        return {
            mensagem: `senha não informada`
        };
    };

    return null


};

const verificarAntesDeAtualizarConta = (cpf, email, numeroConta) => {

    const usuaruioEncontrado = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!usuaruioEncontrado) {
        return {
            mensagem: `usuário inválido!`
        };
    };

    if (usuaruioEncontrado.usuario.cpf !== cpf) {

        const cpfFiltrado = contas.filter((conta) => {
            return conta.usuario.cpf === cpf;
        });

        if (cpfFiltrado.length > 0) {
            return {
                mensagem: `cpf informado já pertence a outro correntista cadastrado`
            };
        };
    };

    if (usuaruioEncontrado.usuario.email !== email) {
        const emailFiltrado = contas.filter((conta) => {
            return conta.usuario.email === email;
        });
        if (emailFiltrado.length > 0) {
            return {
                mensagem: `email informado já pertence a outro correntista cadastrado`
            };
        };
    };

    return null
};

const verificarAntesDeExcluirConta = (numeroConta) => {

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return {
            mensagem: `conta inválida`
        };
    };

    if (contaEncontrada.saldo !== 0) {
        return {
            mensagem: `só é possível excluir uma conta quando não houver saldo`
        };
    };

    return null;
};

const verificarAntesDeDepositar = (numeroConta, valorDeposito) => {

    if (!numeroConta) {
        return {
            mensagem: `é obrigatório informar numero da conta`
        };
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return {
            mensagem: `numero de conta inválido`
        };
    };

    if (!valorDeposito || Number(valorDeposito) < 1) {
        return {
            mensagem: `valor do depósito inválido`
        };
    };

    return null;

};

const verificarAntesDeSacar = (numeroConta, valorSaque) => {

    if (!numeroConta || !valorSaque) {
        return {
            mensagem: `é obrigatório informar numero da conta e valor do saque`
        };
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return {
            mensagem: `numero de conta inválido`
        };
    };

    if (!valorSaque || Number(valorSaque) < 1) {
        return {
            mensagem: `valor do saque inválido`
        };
    };

    if (Number(contaEncontrada.saldo) < valorSaque) {
        return {
            mensagem: `não há saldo suficiente para o saque`
        };
    };

    return null;
};

const verificarCamposBodyTransferencias = (body) => {
    const { numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
        senhaContaOrigem
    } = body;

    if (!numeroContaOrigem) {
        return {
            mensagem: `número da conta de origem não informado`
        };
    };

    if (!numeroContaDestino) {
        return {
            mensagem: `número da conta de destino não informado`
        };
    };

    if (!valorTransferencia) {
        return {
            mensagem: `valor da transferência não informado`
        };
    };

    if (!senhaContaOrigem) {
        return {
            mensagem: `senha da conta de origem não informada`
        };
    };

    return null;
};

const verificarAntesDeTransferir = (body) => {
    const { numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
        senhaContaOrigem
    } = body;

    //Verificação da conta de origem
    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaOrigem;
    });

    if (!contaOrigemEncontrada) {
        return {
            mensagem: `numero de conta de origem inválido`,
        };
    };

    //Verificação da conta de destino
    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaDestino;
    });

    if (!contaDestinoEncontrada) {
        return {
            mensagem: `numero de conta de destino inválido`
        };
    };

    if (contaDestinoEncontrada === contaOrigemEncontrada) {
        return {
            mensagem: `conta de origem e conta de destino são a mesma conta`
        };
    };

    //Verificação do valor da transferência
    if (Number(valorTransferencia) < 1) {
        return {
            mensagem: `valor da transferência inválido`
        };
    };

    //Verificação do saldo da conta de origem
    if (Number(contaOrigemEncontrada.saldo) < valorTransferencia) {
        return {
            mensagem: `não há saldo suficiente para a transferência`
        };
    };

    //Verificação da senha da conta de origem
    if (contaOrigemEncontrada.usuario.senha !== senhaContaOrigem) {
        return {
            mensagem: `senha da conta de origem incorreta`
        };
    };

    return null;
};

module.exports = {
    verificarEmail,
    verificarCamposUsuarioPreenchidos,
    verificarCamposBodyTransferencias,
    verificarCPF,
    verificarAntesDeAtualizarConta,
    verificarAntesDeExcluirConta,
    verificarAntesDeDepositar,
    verificarAntesDeSacar,
    verificarAntesDeTransferir
};