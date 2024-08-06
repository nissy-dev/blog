import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";

type Post = {
  id: string;
  title: string;
  content: string;
};

type Bindings = {
  DB: D1Database;
  WORKER_ENV: string;
  AUTH_USERNAME: string;
  AUTH_PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const segmenter = new Intl.Segmenter("ja", { granularity: "word" });

app.use("*", async (c, next) => {
  const isProd = c.env.WORKER_ENV === "production";
  const corsMiddleware = cors({
    origin: isProd ? ["https://blog.nissy.dev"] : "*",
  });
  return await corsMiddleware(c, next);
});

app.put(
  "/api/fts/upsert",
  async (c, next) => {
    const auth = basicAuth({
      username: c.env.AUTH_USERNAME,
      password: c.env.AUTH_PASSWORD,
    });
    await auth(c, next);
  },
  async (c) => {
    const post = await c.req.json<Post>();
    const { id, title, content } = post;
    const db = c.env.DB;

    // contents テーブルへのデータ追加
    await db
      .prepare(
        `INSERT INTO contents (post_id, title, content) VALUES (?1, ?2, ?3)
         ON CONFLICT(post_id) DO UPDATE SET title = excluded.title, content = excluded.content;`,
      )
      .bind(id, title, content)
      .run();

    // rowid を取得する
    const rowId = await db
      .prepare("SELECT id FROM contents WHERE post_id = ?1")
      .bind(id)
      .first<string>("id");
    if (!rowId) {
      return c.json({ error: "Failed to get rowid" }, 500);
    }

    // fts テーブルへのデータ追加
    const segments = Array.from(segmenter.segment(`${title}。${content}`))
      .filter((s) => s.isWordLike)
      .map((s) => s.segment);
    await db
      .prepare("INSERT OR REPLACE INTO fts (rowid, segments) VALUES (?1, ?2)")
      .bind(rowId, segments.join(" "))
      .run();

    c.status(204);
    return c.body(null);
  },
);

app.get("/api/fts/search", async (c) => {
  const query = c.req.query("q");
  if (!query) {
    return c.json({ error: "Query parameter 'q' is required" }, 400);
  }

  const db = c.env.DB;
  const { results } = await db
    .prepare(
      `SELECT contents.post_id as id, contents.title, contents.content FROM contents
       JOIN fts ON contents.rowid = fts.rowid
       WHERE fts MATCH ?1
       ORDER BY rank
       LIMIT 5`,
    )
    .bind(query)
    .all<Post>();

  return c.json({ posts: results });
});

export default app;
