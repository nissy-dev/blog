import path from "node:path";
import { getPostById, getPostIds } from "@blog/libs/repositories";

const CONTENTS_DIR = path.resolve(process.cwd(), "../../contents");

const WORKER_ENV = process.env.WORKER_ENV ?? "development";
const ENDPOINT =
  WORKER_ENV === "production"
    ? "https://fts.nissy-dev.workers.dev"
    : "http://localhost:8787";

async function main() {
  const postIds = await getPostIds(CONTENTS_DIR);
  const token = btoa(process.env.AUTH_INFO ?? "username:password");
  for (const postId of postIds) {
    const post = await getPostById(CONTENTS_DIR, postId);
    const res = await fetch(`${ENDPOINT}/api/fts/upsert`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        id: postId,
        title: post.frontMatter.title,
        content: post.content,
      }),
    });
    if (!res.ok) {
      console.error(`Failed to insert a post: ${postId}`);
    }
  }
}

main().catch((error) => console.error(error));
