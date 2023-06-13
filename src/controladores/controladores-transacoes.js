const express = require(`express`);
const { format } = require(`date-fns`);
const {
    contas,
    saques,
    depositos,
    transferencias
} = require(`../bancodedados`);

const {
    verificarAntesDeDepositar,
    verificarAntesDeSacar,
    verificarCamposBodyTransferencias,
    verificarAntesDeTransferir
} = require("../funcoes-uteis/verificadores");

//Rota 5
const depositar = (req, res) => {
    const { numeroConta, valorDeposito } = req.body;

    const verifDeposito = verificarAntesDeDepositar(numeroConta, valorDeposito);
    if (verifDeposito) {
        return res.status(400).json(verifDeposito);
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    const { numero, saldo, usuario } = contaEncontrada
    const novoSaldo = Number(saldo) + Number(valorDeposito);

    const contaAtualizada = {
        numero,
        saldo: novoSaldo,
        usuario
    };

    if (contas.indexOf(contaEncontrada) > -1) {
        contas.splice(contas.indexOf(contaEncontrada), 1)
    };

    contas.push(contaAtualizada);

    depositos.push({
        valorDeposito,
        numeroConta,
        data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`)
    });

    return res.status(201).json(
        {
            mensagem: `depósito realizado com sucesso`,
            valorDeposito,
            numeroConta,
            data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`),
        }
    );

};

//Rota 6
const sacar = (req, res) => {
    const { numeroConta, valorSaque } = req.body;

    const verifSaque = verificarAntesDeSacar(numeroConta, valorSaque);
    if (verifSaque) {
        return res.status(400).json(verifSaque);
    };

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    const { numero, saldo, usuario } = contaEncontrada
    const novoSaldo = Number(saldo) - Number(valorSaque);

    const contaAtualizada = {
        numero,
        saldo: novoSaldo,
        usuario
    };

    if (contas.indexOf(contaEncontrada) > -1) {
        contas.splice(contas.indexOf(contaEncontrada), 1)
    };

    contas.push(contaAtualizada);

    saques.push({
        valorSaque,
        numeroConta,
        data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`)
    });

    return res.status(201).json(
        {
            mensagem: `saque realizado com sucesso`,
            valorSaque,
            numeroConta,
            data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`),
        }
    );

};

//Rota 7
const transferir = (req, res) => {
    const { numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
    } = req.body;

    const verifCampos = verificarCamposBodyTransferencias(req.body);
    if (verifCampos) {
        return res.status(400).json(verifCampos);
    };

    const verifTransferencia = verificarAntesDeTransferir(req.body);
    if(verifTransferencia) {
        return res.status(400).json(verifTransferencia);
    };

    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaOrigem;
    });

    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === numeroContaDestino;
    });

    const contaOrigemAtualizada = {
        numero: contaOrigemEncontrada.numero,
        saldo: Number(contaOrigemEncontrada.saldo) - Number(valorTransferencia),
        usuario: contaOrigemEncontrada.usuario
    };

    contas.push(contaOrigemAtualizada);

    const contaDestinoAtualizada = {
        numero: contaDestinoEncontrada.numero,
        saldo: Number(contaDestinoEncontrada.saldo) + Number(valorTransferencia),
        usuario: contaDestinoEncontrada.usuario
    };

    contas.push(contaDestinoAtualizada);

    if (contas.indexOf(contaOrigemEncontrada) > -1) {
        contas.splice(contas.indexOf(contaOrigemEncontrada), 1)
    };


    if (contas.indexOf(contaDestinoEncontrada) > -1) {
        contas.splice(contas.indexOf(contaDestinoAtualizada), 1)
    };


    transferencias.push({
        numeroContaOrigem,
        numeroContaDestino,
        valorTransferencia,
        data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`)
    });

    return res.status(201).json(
        {
            mensagem: `transferência realizado com sucesso`,
            numeroContaOrigem,
            numeroContaDestino,
            valorTransferencia,
            data_e_hora: format(new Date(), `dd/MM/yyyy - HH:mm:ss - OOOO`),
        }
    );
};

//Rolta 8
const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query;

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta;
    });

    const saldo = {
        saldo: contaEncontrada.saldo
    };

    res.status(200).json(saldo);
};

//Rota 9
const consultarExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const extratoSaques = saques.filter((saquesUsuaruio) => {
        return saquesUsuaruio.numeroConta === numero_conta;
    });

    const extratoDepositos = depositos.filter((depositosUsuaruio) => {
        return depositosUsuaruio.numeroConta === numero_conta;
    });

    const extratoTransferenciasRecebidas = transferencias.filter((transferenciasUsuaruio) => {
        return transferenciasUsuaruio.numeroContaDestino === numero_conta;
    });

    const extratoTransferenciasEnvidas = transferencias.filter((transferenciasUsuaruio) => {
        return transferenciasUsuaruio.numeroContaOrigem === numero_conta;
    });

    const extratoCompleto = {
        extratoSaques,
        extratoDepositos,
        extratoTransferenciasRecebidas,
        extratoTransferenciasEnvidas
    };

    return res.status(200).json(extratoCompleto);
};

module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato
};