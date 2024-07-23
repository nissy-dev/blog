import type React from "react";

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
