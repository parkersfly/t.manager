import fs from "node:fs/promises"

const dbPath = new URL("db.json", import.meta.url)

export class Database {
  #database = {}

  constructor(){
    fs.readFile(dbPath, "utf8")
      .then((data) => this.#database = JSON.parse(data))
      .catch(() => {
        this.#persist()
      })
  }

  #persist(){
    fs.writeFile(dbPath, JSON.stringify(this.#database))
  }

  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

   update(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    const rowData = this.#database[table][rowIndex]

    if(rowIndex > -1){
      
     const newRow = {
        ...rowData,
        title: data.title,
        description: data.description,
        updated_at: new Date()
      }

      this.#database[table][rowIndex] = newRow

      this.#persist()
    }
  }

  updateTaskStatus(table, id){
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
      const rowData = this.#database[table][rowIndex]

      if(rowIndex > -1){

        const newRow = {
          ...rowData,
          completed_at: rowData.completed_at === null ? "concluida" : null
        }

        this.#database[table][rowIndex] = newRow

        this.#persist()
      }
  }
}