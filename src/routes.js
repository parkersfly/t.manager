import { randomUUID } from "node:crypto"
import { Database } from "./database/database.js"
import { pathWithRegex } from "./utils/path-with-regex.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: pathWithRegex("/tasks"),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select("tasks", {
        title: search,
        description: search
      })

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
      const { id } = req.params

      const tasks = database.select("tasks")
      const tasksInArray = Object.entries(tasks)

      const checkIfTaskExists = tasksInArray.some(item => {
        return item[1].id === id
      })

      if (checkIfTaskExists) {
        database.delete("tasks", id)

        return res
          .writeHead(204)
          .end("")
      }

      return res
        .writeHead(404)
        .end("Tarefa não encontrada")
    }
  },
  {
    method: "PUT",
    path: pathWithRegex("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body
      const { id } = req.params

      const tasks = database.select("tasks")
      const tasksInArray = Object.entries(tasks)

      const checkIfTaskExists = tasksInArray.some(item => {
        return item[1].id === id
      })

      if (checkIfTaskExists) {
        database.update("tasks", id, {
          title,
          description
        })

        return res
          .writeHead(204)
          .end()
      }

      return res
        .writeHead(404)
        .end("Tarefa não encontrada")
    }
  },
  {
    method: "PATCH",
    path: pathWithRegex("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      const tasks = database.select("tasks")
      const tasksInArray = Object.entries(tasks)

      const checkIfTaskExists = tasksInArray.some(item => {
        return item[1].id === id
      })

      if (checkIfTaskExists) {
        database.updateTaskStatus("tasks", id)

        return res
          .writeHead(204)
          .end()
      }


      return res
        .writeHead(404)
        .end("Tarefa não encontrada")
    }
  }
]