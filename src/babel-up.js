import { getRepositories } from "./git";
import { unlinkAll } from "./yarn";

getRepositories()
  .then(() => {
    console.log("🏁  Finished cloning and updating Babel repositories.");
  })
  .then(() => {
    unlinkAll();
  });
