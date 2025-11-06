import { randomUUID } from "node:crypto"
import { Database } from "./database/database.js"
import { pathWithRegex } from "./utils/path-with-regex.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: pathWithRegex("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks")

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: pathWithRegex("/tasks"),
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
  {
    method: "DELETE",
    path: pathWithRegex("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.groups

      database.delete("tasks", id)

      return res
        .writeHead(204)
        .end()
    }
  }
]