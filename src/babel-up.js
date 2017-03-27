import Git from "nodegit";
import fs from "fs";
import path from "path";

const UP_PATH = "/tmp/babel-up";
const BABEL_PATH = path.join(UP_PATH, "babel");

if (fs.existsSync(BABEL_PATH)) {
  let repository;
  Git.Repository.open(BABEL_PATH)
    .then((repo) => {
      repository = repo;
      return repository.fetchAll();
    })
    .then(() => {
      repository.mergeBranches("7.0", "origin/7.0");
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
