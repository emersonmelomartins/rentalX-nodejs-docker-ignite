<h1 align="center">
  <img src="https://i.imgur.com/oUAKMC5.png"/>
  <br>
  Rent X - Locação de Carros
  <br>
</h1>

<h4 align="center">Aplicação de estudos voltado para locação de carros, criada juntamente com o programa de especialização da <a href="https://www.rocketseat.com.br/" target="_blank">Rocketseat</a> chamado <a href="https://www.rocketseat.com.br/ignite">Ignite</a>, intensivo para aceleração de carreira em programação, seguindo a trilha de backend utilizando NodeJS.</h4>

<hr>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#estrutura">Estrutura</a> •
  <a href="#requisitos">Requisitos</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#tecnologias">Tecnologias</a>
</p>

<hr>

## Features
Essa aplicação possui princípios do SOLID, você pode consultar mais informações [clicando aqui]("https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898").

Além de seguir boas práticas do SOLID, essa aplicação foi desenvolvida em conjunto de Testes Unitários e Testes de Integração para a redução de erros e auxilio durante o desenvolvimento.


Para seguir os temas citados acima, foram utilizados diversas ferramentas úteis como por exemplo:

...

Em construção...
<hr>

## Requisitos
### Requisitos Funcionais
- Cadastro de carros
  - [X] Deve ser possível cadastrar um novo carro;

- Listagem de Carros
  - [X] Deve ser possível listar todos os carros disponíveis;
  - [X] Deve ser possível listar todos os carros disponíveis por categoria;
  - [X] Deve ser possível listar todos os carros disponíveis por marca;
  - [X] Deve ser possível listar todos os carros disponíveis por nome do carro;

- Cadastro de especificação no carro
  - [X] Deve ser possível cadastrar uma especificação para um carro;

- Cadastro de imagens do carro
  - [X] Deve ser possível cadastrar a imagem do carro;

- Aluguel de carro
  - [X] Deve ser possível cadastrar um aluguel;

- Listagem de aluguel por usuário
  - [X] Deve ser possível realizar a busca de todos os alugueis para o usuário;

- Devolução de carro
  - [X] Deve ser possível realizar a devolução de um carro;

- Recuperar senha
  - [] Deve ser possível o usuário recuperar a senha informando o e-mail;
  - [] O usuário deve receber um e-mail com passo-a-passo para recuperação da senha;
  - [] O usuário deve conseguir inserir uma nova senha;

<br>
<hr>

### Requisitos Não Funcionais
- Cadastro de imagens do carro
  - [X] Utilizar o 'multer' para upload dos arquivos
<br>
<hr>

### Regra de Negócio
- Cadastro de carros
  - [X] Não deve ser possível cadastrar um carro com uma placa existente;
  - [X] O carro deve ser cadastrado, por padrão, com disponibilidade;
  - [X] O usuário responsável pelo cadastro deve ser um usuário administrador;

- Listagem de Carros
  - [X] O usuário não precisa estar logado no sistema;

- Cadastro de especificação no carro
  - [X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
  - [X] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
  - [X] O usuário responsável pelo cadastro deve ser um usuário administrador;

- Cadastro de imagens do carro
  - [X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
  - [X] O usuário responsável pelo cadastro deve ser um usuário administrador;

- Aluguel de carro
  - [X] O aluguel deve ter duração mínima de 24 horas;
  - [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
  - [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
  - [X] O usuário deve estar logado na aplicação;
  - [X] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

- Listagem de alugueis por usuário
  - [X] O usuário deve estar logado na aplicação;

- Devolução de carro
  - [X] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
  - [X] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
  - [X] Ao realizar a devolução, deverá ser calculado o total do aluguel;
  - [X] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
  - [X] Caso haja multa, deverá ser somado ao total do aluguel;
  - [X] O usuário deve estar logado na aplicação;

- Recuperar senha
  - [X] O usuário precisa informar uma nova senha;
  - [X] O link enviado para recuperação deve expirar em 3 horas;
<br>
<hr>
<br>

## Instalação/Execução
Essa aplicação utiliza Nodejs para a execução do mesmo.

Também existe a possibilidade de executar via Docker/Docker-Compose.

### Instalação via docker

```bash
# docker
docker build -t rentx .
```

### Instalação via node ou yarn
```bash
# yarn
yarn
# node
npm install
```

### Carregando tabelas banco de dados
```bash
# yarn
yarn typeorm migration:run
# node
npm run typeorm migration:run
```

### Seed de usuário administrador
```bash
# yarn
yarn seed:admin
# node
npm run seed:admin
```

### Execução do projeto
```bash
# docker
docker run -p 3333:3333 rentx

# docker-compose
docker-compose up --force-recreate

# docker-compose rodando em background
docker-compose up -d

# yarn
yarn dev
# node
npm run dev
```

### Execução de testes da aplicação
```bash
# yarn
yarn test
# node
npm run test
```

Em construção...

<br>
<hr>
<br>

## Tecnologias
- NodeJS
- Express
- Typescript
- ESLint
- Prettier
- Bcryptjs
- Dayjs
- Multer
- Typeorm
- Tsyringe
- Jest
- Supertest

Em construção...
<br>
<hr>
<br>
