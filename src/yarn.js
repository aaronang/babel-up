import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { BABEL_PACKAGES_PATH, CWD } from "./paths";

const packages = fs.readdirSync(BABEL_PACKAGES_PATH)
    .filter((f) => fs.statSync(path.join(BABEL_PACKAGES_PATH, f)).isDirectory());

export function linkAll() {
  packages.forEach((pkg) => {
    const package_path = path.join(BABEL_PACKAGES_PATH, pkg);
    process.chdir(package_path);
    spawnSync("yarn", ["link"]);
    console.log(`🔗  Created symbolic link for ${pkg}.`);
  });

  process.chdir(CWD);

  packages.forEach((pkg) => {
    spawnSync("yarn", ["link", pkg]);
    console.log(`🔗  yarn link ${pkg}.`);
  });
}

export function unlinkAll() {
  process.chdir(CWD);
  packages.forEach((pkg) => {
    spawnSync("yarn", ["unlink", pkg]);
    console.log(`✂️  yarn unlink ${pkg}.`);
  });

  packages.forEach((pkg) => {
    const package_path = path.join(BABEL_PACKAGES_PATH, pkg);
    process.chdir(package_path);
    spawnSync("yarn", ["unlink"]);
    console.log(`✂️  Unlinked ${pkg}.`);
  });
}