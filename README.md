# ERP Hospitalar

Trabalho de Projeto de Software

## Documentações

Todos diagramas foram feitos utilizando a linguagem PlantUML e estão na pasta `docs` neste projeto

## Como rodar o projeto

### Configuração do banco de dados local

```bash
# cria um banco de dados usando docker
docker run -d -e POSTGRES_USER=dbuser -e POSTGRES_PASSWORD=dbpass -p 5432:5432 postgres:latest
```

### Configuração das envs

Copie o arquivo `.env.example` para `.env` e ajuste a URL de conexão do banco para utilizar os valores especificados na configuração do banco acima.

### Configuração do projeto

```bash
# instala as dependências
yarn install

# cria as tabelas no banco de dados
yarn migrate:dev
```
