<h1 align="center">
  <br>
  Rental X - Locação de Carros
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

- Devolução de carro
  - [] Deve ser possível realizar a devolução de um carro;

<br>
<hr>

### Requisitos Não Funcionais
- Cadastro de imagens do carro
  - [X] Utilizar o 'multer' para upload dos arquivos
<br>
<hr>

### Regra de Negócio
- Cadastro de carros
  - Não deve ser possível cadastrar um carro com uma placa existente;
  - O carro deve ser cadastrado, por padrão, com disponibilidade;
  - O usuário responsável pelo cadastro deve ser um usuário administrador;

- Listagem de Carros
  - O usuário não precisa estar logado no sistema;

- Cadastro de especificação no carro
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
  - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
  - O usuário responsável pelo cadastro deve ser um usuário administrador;

- Cadastro de imagens do carro
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
  - O usuário responsável pelo cadastro deve ser um usuário administrador;

- Aluguel de carro
  - O aluguel deve ter duração mínima de 24 horas;
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
  - O usuário deve estar logado na aplicação;
  - Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

- Devolução de carro
  - Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
  - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
  - Ao realizar a devolução, deverá ser calculado o total do aluguel;
  - Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
  - Caso haja multa, deverá ser somado ao total do aluguel;
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
