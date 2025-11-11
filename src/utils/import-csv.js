import fs from "node:fs"
import { parse } from "csv-parse";

export async function importCsv() {
  const parser = fs.createReadStream("./src/utils/content.csv").pipe(parse({
    columns: true,
  }));

  const fullContent = []

  for await (const chunk of parser) {
    fullContent.push(chunk)
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return fullContent
}