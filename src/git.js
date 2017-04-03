import { BABEL_PATH, BABEL_PRESET_ENV_PATH } from "./paths";
import fs from "fs";
import Git from "nodegit";

const repositories = [
  {
    name: "babel/babel",
    url: "https://github.com/babel/babel.git",
    path: BABEL_PATH,
    branch: "7.0",
    release: "v6.22.0"
  },
  {
    name: "babel/babel-preset-env",
    url: "https://github.com/babel/babel-preset-env.git",
    path: BABEL_PRESET_ENV_PATH,
    branch: "master",
    release: "v1.3.0"
  }
];

function get(repository) {
  const { path } = repository;
  if (fs.existsSync(path)) {
    return update(repository);
  } else {
    return clone(repository);
  }
}

function clone({ name, url, path }) {
  return Git.Clone(url, path)
    .then((repository) => {
      console.log(`👯  Cloned ${name}.`);
      return repository;
    })
    .catch((error) => {
      console.error(`⚠️  ${error.message}.`);
    });
}

function update({ name, path, branch }) {
  let repository;
  return Git.Repository.open(path)
    .then((repo) => {
      repository = repo;
      return repository.fetchAll();
    })
    .then(() => {
      return repository.mergeBranches(branch, `origin/${branch}`);
    })
    .then(() => {
      console.log(`✨  Updated ${name}.`);
      return repository;
    });
}

export function getRepositories() {
  return Promise.all(repositories.map((repository) => {
    let repo;
    return get(repository)
      .then((r) => {
        repo = r;
        return repo.getReference(repository.release);
      })
      .then((ref) => {
        return repo.setHeadDetached(ref.target());
      })
      .then(() => {
        return Git.Checkout.head(repo, {
          checkoutStrategy: Git.Checkout.STRATEGY.FORCE
        });
      })
      .catch((error) => console.error(error));
  }));
}