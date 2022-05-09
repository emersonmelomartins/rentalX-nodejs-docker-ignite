<h1 align="center">
  <br>
  Rental X
  <br>
</h1>

<h4 align="center">Aplicação de estudos voltado para locação de carros.</h4>

<hr>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#estrutura">Estrutura</a> •
  <a href="#requisitos">Requisitos</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#tecnologias">Tecnologias</a>
</p>

## Features
Essa aplicação possui princípios do SOLID, você pode consultar mais informações [clicando aqui.]("https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898")

<br>
Além disso, diversas ferramentas úteis foram utilizadas durante o desenvolvimento da aplicação como por exemplo:
<br>
Em construção...
<br>
<hr>
<br>

## Requisitos
### Requisitos Funcionais
- Cadastro de carros
  - Deve ser possível cadastrar um novo carro;

- Listagem de Carros
  - Deve ser possível listar todos os carros disponíveis;
  - Deve ser possível listar todos os carros disponíveis por categoria;
  - Deve ser possível listar todos os carros disponíveis por marca;
  - Deve ser possível listar todos os carros disponíveis por nome do carro;

- Cadastro de especificação no carro
  - Deve ser possível cadastrar uma especificação para um carro;
  - Deve ser possível listar todas as especificações;
  - Deve ser possível listar todos os carros;

- Cadastro de imagens do carro
  - Deve ser possível cadastrar a imagem do carro;
  - Deve ser possível listar todos os carros;

- Aluguel de carro
  - Deve ser possível cadastrar um aluguel;

<br>
<hr>

### Requisitos Não Funcionais
- Cadastro de imagens do carro
  - Utilizar o 'multer' para upload dos arquivos
<br>
<hr>

### Regra de Negócio
- Cadastro de carros
  - Não deve ser possível cadastrar um carro com uma placa existente;
  - O carro deve ser cadastrado, por padrão, com disponibilidade;
  - * O usuário responsável pelo cadastro deve ser um usuário administrador;

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
<br>
<hr>
<br>

## Instalação/Execução
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
docker-compose up

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
Em construção...
<br>
<hr>
<br>
