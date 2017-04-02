import { getRepositories } from "./git";
import { linkAll, unlinkAll } from "./yarn";
import { spawn } from "child_process";

getRepositories()
  .then(() => {
    console.log("🏁  Finished cloning and updating Babel repositories.");

    linkAll();

    const test = spawn("yarn", ["run", "test"]);
    test.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    test.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      unlinkAll();
    });
  });
