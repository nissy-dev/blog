import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Not Found",
  description: "404: Not Found",
};

export default function NotFound() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12rem 0",
          color: "var(--foreground)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Not Found</h1>
        <p style={{ marginTop: "1rem" }}>
          You just hit a route that doesn&#39;t exist...
        </p>
      </div>
    </main>
  );
}
