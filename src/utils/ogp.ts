import path from "path";

import { OGP_DIR, siteMetadata } from "./const";

export function getOgpImagePath(id: string): string {
  return path.join(siteMetadata.siteUrl, "/", OGP_DIR, `${id}.png`);
}
