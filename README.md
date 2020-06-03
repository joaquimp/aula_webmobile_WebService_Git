# WebService Exemplo - 

Este repositório contém o código base para o desenvolvimento de ativida sobre WebService utilizando NestJS com banco de dados relacional.

Para o funcionamento local é necessário ter um banco, de preferência MariaDB, instalado e funcionando na porta `3306` com a base de dados `webmobile`, usuário `root` e senha `root`. Caso deseje alterar isso no projeto veja o arquivo `src\config\typeorm.config.ts`

## Para treinamento é sugerido

### Bronze

Implementar as seguintes rotas para `Task`

1. Verbo `GET` para a rota `/tasks?completed=:boolean`: 
   - `boolean` pode ser `true` ou `false` 
   - esta rota deve retornar as `Tasks` que estão de acordo com atributo `completed`
1. Verbo `PUT` para a rota `/tasks/:id`
   - `id` é o identificador de uma `Task`
   - o `body` deve ter os dados que devem ser alterado (todos os dados devem ser informados)
   - altera uma `Task` existente
1. Verbo `DELETE` para a rota `/tasks/:id`
   - `id` é o identificador de uma `Task`
   - apaga uma `Task` específica

### Prata

Implementar novas entidades (schemas)

1. `Car` com os atributos
   - `id`: number
   - `brand`: string
   - `model`: string
   - `year`: identificador
1. `Student` com os atributos
   - `id`: number
   - `name`: string
   - `course`: string
1. `Professor` com os atributos
   - `id`: number
   - `name`: string
   - `university`: string
1. `Computer` com os atributos
   - `id`: number
   - `processor`: string
   - `memory`: string

### Ouro

Desenvolver um sistema de autenticação baseado em JWT.

Ler:

- [Authentication - NestJS](https://docs.nestjs.com/techniques/authentication)
- [JWT.io](https://jwt.io)
