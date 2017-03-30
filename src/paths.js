import path from "path";
import os from "os";

export const TEMP_PATH = os.tmpdir();
export const BABEL_UP_PATH = path.join(TEMP_PATH, "babel-up");
export const BABEL_PATH = path.join(BABEL_UP_PATH, "babel");
export const BABEL_PRESET_ENV_PATH = path.join(BABEL_UP_PATH, "babel-preset-env");
export const BABEL_PACKAGES_PATH = path.join(BABEL_PATH, "packages");
