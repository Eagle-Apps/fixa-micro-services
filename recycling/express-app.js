import express from "express";
import cors from "cors";
import { recycling } from "./src/api/recycling.js";
import { appEvents } from "./src/api/app-events.js";
import HandleErrors from "./src/utils/error-handler.js";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Listen to Events
  appEvents(app);

  //api
  recycling(app);

  // error handling
  app.use(HandleErrors);
};
