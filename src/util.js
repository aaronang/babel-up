import { BABEL_PATH } from "./paths";
import fs from "fs";
import Git from "nodegit";

export async function cloneBabel() {
  if (fs.existsSync(BABEL_PATH)) {
    let repository;
    Git.Repository.open(BABEL_PATH)
      .then((repo) => {
        repository = repo;
        return repository.fetchAll();
      })
      .then(() => {
        return repository.mergeBranches("7.0", "origin/7.0");
      })
      .done(() => {
        console.log("✨  Repository updated successfully.");
      });
  } else {
    Git.Clone("https://github.com/babel/babel.git", BABEL_PATH)
      .then(() => {
        console.log("✨  Repository cloned successfully.");
      })
      .catch((error) => {
        console.error(`⚠️  ${error.message}.`);
      });
  }
}
