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

app.post(
  "/api/fts/insert",
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
    const resInsertContents = await db
      .prepare(
        "INSERT INTO contents (post_id, title, content) VALUES (?1, ?2, ?3)",
      )
      .bind(id, title, content)
      .run();
    if (!resInsertContents.success) {
      return c.json(
        { error: "Failed to insert a row into contents table" },
        500,
      );
    }

    // fts テーブルへのデータ追加
    const rowId = resInsertContents.meta.last_row_id;
    const segments = Array.from(segmenter.segment(`${title}。${content}`))
      .filter((s) => s.isWordLike)
      .map((s) => s.segment);
    const resInsertFts = await db
      .prepare("INSERT INTO fts (rowid, segments) VALUES (?1, ?2)")
      .bind(rowId, segments.join(" "))
      .run();
    if (!resInsertFts.success) {
      return c.json({ error: "Failed to insert a row into fts table" }, 500);
    }

    c.status(201);
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
      `SELECT contents.post_id as id, contents.title, contents.content FROM fts
       JOIN contents ON contents.rowid = fts.rowid WHERE fts MATCH ?1 LIMIT 5`,
    )
    .bind(query)
    .all<Post>();

  return c.json({ posts: results });
});

export default app;
