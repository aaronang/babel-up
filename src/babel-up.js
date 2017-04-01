import { getRepositories } from "./git";
import { linkAll, unlinkAll } from "./yarn";

getRepositories()
  .then(() => {
    console.log("🏁  Finished cloning and updating Babel repositories.");
  })
  .then(() => {
    linkAll();
    unlinkAll();
  });
