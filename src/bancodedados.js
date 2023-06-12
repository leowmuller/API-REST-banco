module.exports = {
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [
        {
            numero:  "1",
            saldo: 10,
            usuario: {
                nome: 'Foo Bar',
                cpf: '12345678910',
                data_nascimento: '2021-03-15',
                telefone: '71999998888',
                email: 'foo@bar.com',
                senha: '1234'
            }
        },
        {
            numero:  "2",
            saldo: 0,
            usuario: {
                nome: 'Teste testado',
                cpf: '07325917911',
                data_nascimento: '2011-03-15',
                telefone: '41999998888',
                email: 'teste@bar.com',
                senha: '1234'
            }
        }
        
    ],
    saques: [
        {
            "valorSaque": 50,
            "numeroConta": "1",
            "data_e_hora": "08/06/2023 - 22:46:21 - GMT-03:00"
        },
        {
            "valorSaque": 700,
            "numeroConta": "2",
            "data_e_hora": "07/06/2023 - 22:46:21 - GMT-03:00"
        }
    ],
    depositos: [
        {
            "valorDeposito": 50000,
            "numeroConta": "2",
            "data_e_hora": "10/06/2023 - 23:17:49 - GMT-03:00"
        },
        {
            "valorDeposito": 50000,
            "numeroConta": "1",
            "data_e_hora": "11/05/2023 - 23:17:49 - GMT-03:00"
        }
    ],
    transferencias: [
        {
            "numeroContaOrigem": "1",
            "numeroContaDestino": "2",
            "valorTransferencia": 500,
            "data_e_hora": "10/06/2023 - 22:38:34 - GMT-03:00"
        },
        {
            "numeroContaOrigem": "2",
            "numeroContaDestino": "1",
            "valorTransferencia": 5000,
            "data_e_hora": "9/06/2023 - 22:38:34 - GMT-03:00"
        },
    ]
};
