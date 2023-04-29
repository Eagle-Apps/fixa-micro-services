import express from "express";
import cors from "cors";
import { specials } from "./src/api/specials.js.js";
// import { appEvents } from "./src/api/app-events.js.js";
import HandleErrors from "./src/utils/error-handler.js.js";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Listen to Events
  // appEvents(app);

  //api
  specials(app);

  // error handling
  app.use(HandleErrors);
};
