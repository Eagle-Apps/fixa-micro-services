import express from "express";
import cors from "cors";
import { Unit} from "../unitManagement/src/api/unit.js";
import { appEvents } from "../unitManagement/src/api/app-events.js";
import HandleErrors from "../unitManagement/src/utils/error-handler.js";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Listen to Events
  appEvents(app);

  //api
  Unit(app);

  // error handling
  app.use(HandleErrors);
};
