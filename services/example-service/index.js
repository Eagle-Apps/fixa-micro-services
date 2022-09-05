import express from "express";
import { expressApp } from "./express-app";
import { connect_db } from "./src/dba/connection";
const { PORT } = require("./config");

const StartServer = async () => {
  const app = express();

  await connect_db();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
