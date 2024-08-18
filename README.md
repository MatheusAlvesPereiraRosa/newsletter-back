# newsletter-back

Esse teste tem o objetivo de me ajudar a passar no processo seletivo da vaga de desenvolvedor Fullstack. Segue abaixo algumas informações sobre como ele foi feito e como rodá-lo.

O back-end foi feito utilizando Nest por sua praticidade envolvendo testes (Jest) e sua metologia (services, modules e controllers).

## Comandos para executar

### Banco de dados

Primeiramente, certifique-se que você possui o postgres SQL baixado em sua máquina e rodando:

Link do site: [[https://neo4j.com/download/](https://www.postgresql.org/download/)](https://www.postgresql.org/download/)

Configure o banco de dados em sua máquina e depois abra o pgAdmin para entrar no gerenciador de banco de dados.

Após isso, crie uma base de dados chamada **"newsletter"**.

### Aplicação

Execute um git clone no seu terminal de preferência com o link (HTTPS ou SSH) do repositório:

```
  git clone https://github.com/MatheusAlvesPereiraRosa/newsletter-back.git
```

Entre no arquivo do repositório local e rode:

```
  npm i
```

Configure seu arquivo .env para ter os dados necessário para se conectar ao seu banco de dados

Ex de .env.:

```
  DATABASE_URL="postgresql://<seu-usuário>:<sua-senha>@localhost:5432/newsletter?schema=public"
```

Depois rode:

```
  npm run start:dev
```

Após isso sua aplicação irá iniciar e você sera levado a página inicial com tudo funcionando.

### Testes

Com o bando de dados funcionando, rode o seguinte comando para executar os testes de integração no back-end:

```
  npm run test
```
