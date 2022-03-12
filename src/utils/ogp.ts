import path from "path";

import { OGP_DIR } from "./const";

export function getOgpImagePath(id: string): string {
  return path.join("/", OGP_DIR, `${id}.png`);
}
