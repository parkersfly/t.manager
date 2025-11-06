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
      const { newTask } = req.body

      tasks.push(newTask)

      return res.end("Tarefa adicionada com sucesso!")
    }
  },
]