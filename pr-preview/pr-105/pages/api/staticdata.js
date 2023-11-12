import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), "json");

  const fileContents = await fs.readFile(jsonDirectory + "/execs.json", "utf8");

  const obj = JSON.parse(fileContents);
  res.status(200).json(obj);
}
