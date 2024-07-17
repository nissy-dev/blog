import fs from "node:fs/promises";

export async function getPostIds(contentsDir: string) {
  return fs.readdir(contentsDir);
}
