//Inicialização das rotas
const { Router } = require(`express`);
const rotas = Router();

//Controladores de operações com conta bancária
const { listarContas,
    criarConta,
    atualizarUsuario,
    deletarContaBancaria
} = require(`./controladores/controladores-conta`);

//Controladores de transações financeiras
const {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato
} = require(`./controladores/controladores-transacoes`);

//Intermediários
const { verificarSenhaBanco,
    verificarSenhaUsuarioQueryParams,
    verificarAntesDeAtualizarConta,
    verificarAntesDeExcluirConta,
    verificarAntesDeDepositar,
    verificarSenhaUsuarioNoBody,
    verificarAntesDeSacar,
    verificarAntesDeTransferir
} = require(`./controladores/intermediarios`);


//Verificadores de campos
const { verificarCPF,
    verificarEmail,
    verificarCamposUsuarioPreenchidos,
    verificarCamposBodyTransferencias
} = require(`./funcoes-uteis/verif-campos`);


//Rota 1
//Listar contas bancárias
rotas.get(`/contas`, 
verificarSenhaBanco, 
listarContas);

//Rota 2
//Criar conta bancária
rotas.post(`/contas`, 
verificarSenhaBanco, 
verificarCamposUsuarioPreenchidos, 
verificarCPF, 
verificarEmail, 
criarConta);

//Rota 3
//Atualizar usuário da conta bancária
rotas.put(`/contas/:numeroConta/usuario`, 
verificarSenhaUsuarioQueryParams, 
verificarAntesDeAtualizarConta, 
atualizarUsuario);

//Rota 4
//Deletar conta bancária
rotas.delete(`/contas/:numeroConta`, 
verificarSenhaUsuarioQueryParams, 
verificarAntesDeExcluirConta, 
deletarContaBancaria);

//Rota 5
//Depositar
rotas.post(`/transacoes/depositar`, 
verificarAntesDeDepositar, 
depositar);

//Rota 6
//Sacar
rotas.post(`/transacoes/sacar`, 
verificarAntesDeSacar, 
verificarSenhaUsuarioNoBody, 
sacar);

//Rota 7
//Transferir
rotas.post(`/transacoes/transferir`, 
verificarCamposBodyTransferencias, 
verificarAntesDeTransferir, 
transferir);

//Rota 8
//Consultar Saldo
rotas.get(`/contas/saldo`, 
verificarSenhaUsuarioQueryParams, 
consultarSaldo);

//Rota 9
//Consultar extrato
rotas.get(`/contas/extrato`, 
verificarSenhaUsuarioQueryParams, 
consultarExtrato);

module.exports = rotas;