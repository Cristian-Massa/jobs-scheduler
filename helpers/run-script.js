import { exec } from "child_process";

export function runJob(job) {
  exec(`node ${job.file}`, (err, stdout, stderr) => {
    const now = new Date().toISOString();
    if (err) return console.error(`[${now}] ❌ Error:`, err.message);
    if (stderr) return console.error(`[${now}] ⚠️ Stderr:`, stderr);
    console.log(`[${now}] ✅ Tarea ${job.title}:\n${stdout}`);
  });
}
