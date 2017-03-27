import { sync as commandExists } from "command-exists";

if (!commandExists("yarn")) {
  console.error("⚠️  Babel UP requires Yarn to be installed.");
  process.exit(1);
}
