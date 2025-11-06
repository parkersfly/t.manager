import { randomUUID } from "node:crypto"
import { Database } from "./database/database.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks")

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

      database.insert("tasks", newTask)

      return res.end("Tarefa adicionada com sucesso!")
    }
  },
]