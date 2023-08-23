# API mock simulando sistema bancário com persistência de dados em memória
Exercício entregue para a [@cubos-academy](https://github.com/cubos-academy) para o módulo 2 do cuso de JavaScrtip Back-End

## Esta API RESTful mock simula as seguintes funções:
-   Criar conta bancária;
-   Atualizar os dados do usuário da conta;
-   Depósitar em uma conta;
-   Sacar de uma conta;
-   Transferir valores entre contas;
-   Consultar saldo de uma conta;
-   Emitir extrato bancário;
-   Excluir uma conta.

## Endpoints/Rotas

### Listar contas bancárias

#### `GET` `/contas?senha_banco=123`

Esse recurso lista todas as contas bancárias existentes.

-   Entrada (query params)

    -   Senha do banco;

-   Saída
    -   listagem de todas as contas bancárias existentes.

### Criar conta bancária

#### `POST` `/contas`

Cria uma conta bancária e gera um número único para identificação da conta (número da conta).
-   Entradas
    -   Nome;
    -   Cpf;
    -   Data Nascimento;
    -   Telefone;
    -   Email;
    -   Senha.
      
-   Saída
    -   Dados usuário;
    -   Número da conta;
    -   Saldo.

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Atualiza apenas os dados do usuário de uma conta específica.

-   Entradas
    -   Nome;
    -   Cpf;
    -   Data Nascimento;
    -   Telefone;
    -   Email;
    -   Senha.

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Deleta uma conta bancária específica.

-   Entradas

    -   Numero da conta bancária (passado como parâmetro na rota).

### Depositar

#### `POST` `/transacoes/depositar`

Soma o valor do depósito ao saldo de uma conta específica e salva o registro desta transação.

-   Entrada

    -   Número da conta;
    -   Valor.

#### `POST` `/transacoes/sacar`

Faz o saque de um valor determinado de uma conta bancária e registra esta transação.

-   Entrada
    -   Número da conta;
    -   Valor;
    -   Senha.

### Tranferir

#### `POST` `/transacoes/transferir`

Transfere valores de uma conta bancária para outra e salva o registro desta transação.

-   Entrada
    -   Número da conta (origem);
    -   Senha da conta (origem);
    -   Valor;
    -   Número da conta (destino).
      
### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Exibe saldo de uma conta bancária determinada.

-   Entrada (query params)
    -   Número da conta;
    -   Senha.

-   Saída
    -   Saldo da conta.

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Retorna as transações realizadas através de uma conta específica.

-   Entrada (query params)

    -   Número da conta;
    -   Senha.

-   Saída
    -   Relatório da conta.
