# Projeto: To do List

## Sobre
Este projeto foi realizado para a participação de um processo seletivo, para uma vaga de Desenvolvedor Fullstack em JS, utilizando
as seguintes tecnologias:

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,react,vite,postgres)](https://skillicons.dev)

## Configuração do Banco de Dados
> [!TIP]    
> Recomendo fortemente a utilização do pgAdmin, para que consiga ter melhor interação visual com o servidor e os dados das tabelas.

> [!NOTE]   
> Não se preocupe com a criação de tabelas, ao executar o servidor Backend, as mesmas já serão criadas.

Siga os passos abaixo para configurar o servidor PostgreSQL e garantir que o banco de dados esteja pronto para ser utilizado pela aplicação:

1. **Configuração do Servidor**
   Configure um servidor PostgreSQL com os seguintes parâmetros:

   - **Host**: `localhost`
   - **Usuário**: `postgres`
   - **Porta**: `5432`
   - **Senha**: `rootUser`
   - **Banco de dados**: `postgres`

2. Mantenha o servidor rodando para que a aplicação possa acessá-lo!

## Instalação do Projeto
> [!IMPORTANT]  
> Deve-se ter node e npm instalados em seu computador.

1. Clone este repositório em sua máquina local:
   ```bash
   git clone https://github.com/Yggdrae/todoList
   ```

2. A partir da pasta raiz do projeto, navegue até a pasta "server", instale as dependências e inicie o servidor:
   ```bash
   cd ./server
   npm i
   npm run dev
   ```

3. Divida o terminal apertando **`Ctrl + Shift + 5`**

4. No novo terminal, navegue até a pasta "client", instale as dependências e inicie o servidor:
   ```bash
   cd ./client
   npm i
   npm run dev
   ```

5. Pronto! Os servidores Backend e Frontend estão rodando!


## Uso

1. Com os servidores rodando, acesse a página de login: [http://localhost:5173](http://localhost:5173)

2. Clique em registrar-se, logo abaixo do formulário de login e insira suas informações.

3. Ao registrar-se com sucesso, você deverá estar de volta a página inicial, realize o login e divirta-se!
