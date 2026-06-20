import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolvePath(...paths: string[]) {
  return path.join(__dirname, ...paths);
}
