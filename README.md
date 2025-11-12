
# T. Manager

Bem vindo(a) ao t.manager! Um sistema de gerenciamento de tarefas, no qual a aplicação é construída com nodejs puro visando explorar seus principais conceitos e fundamentos.

### Instalação

Sinceramente, não tem muito segredo, basta rodar o comando com o gerenciador de pacotes de sua preferência:

```bash
- npm install

// Então rodar o servidor:

- npm run dev
```


---

### Endpoints da API

```markdown
### GET /tasks
- Realiza a listagem de todas as tarefas. Pode ser passado um query parameter para realizar a busca de uma tarefa pelo título ou descrição, exemplo:

### GET /tasks?search=tarefa1
- Realiza a listagem de todas as tarefas que contenham o conteúdo do search no título ou na descrição
```

```markdown
### POST /tasks
 - Cria uma nova tarefa. Caso não tenha sido passado o body da requisição, a rota realiza a leitura de um arquivo csv (obs: no atual momento da aplicação arquivos csv ainda não podem ser enviados pela requisição, essa funcionalidade chega em breve!) adicionando o conteúdo do arquivo no campo title e description.

#### Corpo da requisição:
```json
{
  "title": "Tarefa 1",
  "description": "Descrição da tarefa 1"
}
```

```markdown
### PUT /tasks
 - Atualiza uma tarefa no banco de dados de acordo com o id passado. Contém um validador caso o id não corresponda a uma tarefa existente, retornando um erro.

#### Corpo da requisição:
```json
{
  "title": "novo titulo",
  "description": "nova descrição"
}
```

```markdown
### PATCH /tasks/:id/complete
 - Atualiza o status de uma tarefa para concluída ou pendente no banco de dados de acordo com o id passado. Contém um validador caso o id não corresponda a uma tarefa existente, retornando um erro.
```

```markdown
### DELETE /tasks/:id
 - Remove uma tarefa do banco de dados de acordo com o id passado. Contém um validador caso o id não corresponda a uma tarefa existente, retornando um erro.
```
