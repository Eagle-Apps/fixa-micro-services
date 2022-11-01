import express from "express";
import cors from "cors";
import { technician } from "./src/api/technician.js";
import { appEvents } from "./src/api/app-events.js";
import HandleErrors from "./src/utils/error-handler.js";

export const expressApp = async (app, channel) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // //Listen to Events
  // appEvents(app);

  //api
  technician(app, channel);

  // error handling
  app.use(HandleErrors);
};
