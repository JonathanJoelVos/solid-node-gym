# APP

Gympass style app.

## RFs - Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de usuário logado; 
- [x] Deve ser possível realizar o check-in em uma academia;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-in;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível buscar uma academias prócimas;
- [ ] Deve ser possível buscar uma academias pelo nome;
- [ ] Deve ser possível validar o chek-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs - Regras de Negócio (sempre associada com um RF)

- [x] O usuário não deve poder se cadastrar com um e-mail já existente;
- [x] O usuário não pode fazer check-in duas vezes no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver até 100 metros de uma academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs - Requisitos Não Funcionais (o usuário não precisa ter acsso)
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação devem ser armazenados em um banco de dados PostgreSQL
- [x] Todas listas de dados devem ser paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um token JWT (JSON Web Token)