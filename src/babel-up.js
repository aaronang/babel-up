import { getRepositories } from "./git";

getRepositories()
  .then(() => console.log("🏁  Finished."));
