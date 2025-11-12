import { timeStringToMiliseconds } from "./helpers/time-string-to-miliseconds.js";
import fsPromise from "fs/promises";
import { runJob } from "./helpers/run-script.js";

fsPromise
  .readFile("./jobs-list.json", "utf-8", (err) => {
    if (err) return console.log("Error al leer la lista de tareas");
  })
  .then((data) => {
    const jobs = JSON.parse(data);
    for (const job of jobs) {
      const time = timeStringToMiliseconds(job.interval);
      console.log(`Procesando script cada: ${time / 1000} segundos`);
      if (job.executeOnStart) runJob(job);
      setInterval(runJob, time);
    }
  })
  .catch((error) => {
    console.log(`Error al leer las tareas: ${error}`);
    process.exit(1);
  });
