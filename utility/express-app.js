import express from "express";
import cors from "cors";
import { utility } from "./src/api/utility.js";
import { appEvents } from "./src/api/app-events.js";
import HandleErrors from "./src/utils/error-handler.js";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Listen to Events
  appEvents(app);

  //api
  utility(app);

  // error handling
  app.use(HandleErrors);
};
