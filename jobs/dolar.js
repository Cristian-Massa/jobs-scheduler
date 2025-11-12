import https from "https";
import fs from "fs/promises";
import { existsSync } from "fs";
const API_URL = "https://api.bluelytics.com.ar/v2/latest";

https
  .get(API_URL, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        const oficial = json.oficial.value_avg;
        const blue = json.blue.value_avg;

        console.log(`[💵] Cotización del Dólar`);
        console.log(`Oficial: $${oficial}`);
        console.log(`Blue:    $${blue}`);
        if (!existsSync("./logs")) {
          fs.mkdir("./logs");
        }
        const now = new Date();
        fs.writeFile(
          "./logs/dolar_job_log.txt",
          `[💵] Cotización del Dólar\n
          ${now}:\n
        Oficial: $${oficial}\n
        Blue: $${blue}\n
        ________________________\n`,
          {
            flag: "a",
          },
        ).catch((error) => {
          console.error(`Error al crear log de dolar: ${error}`);
          process.exit(1);
        });
      } catch (err) {
        console.error("Error parseando JSON:", err);
      }
    });
  })
  .on("error", (err) => {
    console.error("Error de conexión:", err.message);
  });
