# Controle de Investimentos - Backend

## Sobre o Projeto
API RESTful desenvolvida como parte de um teste prático para gerenciar uma carteira de investimentos. Esta API lida com todas as operações de CRUD (Criar, Ler, Atualizar, Deletar), valida os dados recebidos e persiste as informações em um arquivo JSON local que funciona como um banco de dados simples.

Este é o **backend** da aplicação. O repositório do frontend pode ser encontrado aqui: `https://github.com/natan-mluz/controle-investimentos-frontend`

***

## Funcionalidades
-   **API RESTful:** Endpoints seguindo as convenções REST.
-   **Persistência de Dados:** Os dados são salvos em um arquivo `db.json`, garantindo que as informações não sejam perdidas ao reiniciar o servidor.
-   **Validações no Servidor:** Regras de negócio implementadas para garantir a integridade dos dados (ex: valor investido deve ser maior que zero, a data do investimento não pode ser no futuro, etc.).

***

## Tecnologias Utilizadas
-   **Node.js:** Ambiente de execução para o JavaScript no servidor.
-   **Express.js:** Framework minimalista e robusto para a construção da API, rotas e middlewares.
-   **Nodemon:** Ferramenta que monitora alterações nos arquivos e reinicia o servidor automaticamente durante o desenvolvimento.
-   **CORS:** Middleware para habilitar o Cross-Origin Resource Sharing, permitindo que o frontend (em outra origem) acesse a API.

***

## Pré-requisitos
Antes de começar, é necessário ter as seguintes ferramentas instaladas:
-   Node.js (que já inclui o `npm`)
-   Git (para clonar o repositório)

***

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/natan-mluz/controle-investimentos-backend.git](https://github.com/natan-mluz/controle-investimentos-backend.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd controle-investimentos-backend
    ```

3.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  O servidor será iniciado e estará escutando na porta `3000`. Você verá a mensagem: `Servidor rodando na porta 3000 e salvando dados em db.json`.

***

## Estrutura do "Banco de Dados" (`db.json`)
A aplicação utiliza um arquivo `db.json` na raiz do projeto para persistir os dados. Um objeto de investimento possui a seguinte estrutura:
```json
{
  "id": 1,
  "nome": "Ação VALE3",
  "tipo": "Ação",
  "valor": 5000,
  "data": "2024-07-20"
}