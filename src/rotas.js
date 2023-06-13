//Inicialização das rotas
const { Router } = require(`express`);
const rotas = Router();

//Controladores de operações com conta bancária
const { 
    listarContas,
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
const { 
    verificarSenhaBanco,
    verificarSenhaUsuarioQueryParams,
    verificarSenhaUsuarioNoBody,
} = require(`./controladores/intermediarios`);


//Rota 1
//Listar contas bancárias
rotas.get(`/contas`, verificarSenhaBanco, listarContas);

//Rota 2
//Criar conta bancária
rotas.post(`/contas`, verificarSenhaBanco, criarConta);

//Rota 3
//Atualizar usuário da conta bancária
rotas.put(`/contas/:numeroConta/usuario`, verificarSenhaUsuarioQueryParams, atualizarUsuario);

//Rota 4
//Deletar conta bancária
rotas.delete(`/contas/:numeroConta`, verificarSenhaUsuarioQueryParams, deletarContaBancaria);

//Rota 5
//Depositar
rotas.post(`/transacoes/depositar`, depositar);

//Rota 6
//Sacar
rotas.post(`/transacoes/sacar`, verificarSenhaUsuarioNoBody,sacar);

//Rota 7
//Transferir
rotas.post(`/transacoes/transferir`, transferir);

//Rota 8
//Consultar Saldo
rotas.get(`/contas/saldo`, verificarSenhaUsuarioQueryParams, consultarSaldo);

//Rota 9
//Consultar extrato
rotas.get(`/contas/extrato`, verificarSenhaUsuarioQueryParams, consultarExtrato);

module.exports = rotas;