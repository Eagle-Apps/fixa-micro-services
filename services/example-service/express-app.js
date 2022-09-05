import express from "express";
import cors from "cors";
import { Exampleservice } from "./src/api/exampleservice";
import HandleErrors from "./utils/error-handler";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());

  //Listen to Events //
  appEvents(app);

  //api
  Exampleservice(app);

  // error handling
  app.use(HandleErrors);
};
