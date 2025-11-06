import { randomUUID } from "node:crypto"

const tasks = []

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        updated_at: null,
        created_at: new Date()
      }

      tasks.push(newTask)

      return res.end("Tarefa adicionada com sucesso!")
    }
  },
]