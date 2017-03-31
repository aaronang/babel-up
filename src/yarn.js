import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { BABEL_PACKAGES_PATH } from "./paths";

export function unlinkAll() {
  const packages = fs.readdirSync(BABEL_PACKAGES_PATH)
    .filter((f) => fs.statSync(path.join(BABEL_PACKAGES_PATH, f)).isDirectory());
  packages.forEach((pkg) => {
    const package_path = path.join(BABEL_PACKAGES_PATH, pkg);
    process.chdir(package_path);
    spawnSync("yarn unlink");
    console.log(`✨  ${pkg} successfully unlinked.`);
  });
}