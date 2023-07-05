import express from "express";
import cors from "cors";
import { billing } from "../billing-services/src/api/billing.js";
import { appEvents } from "../billing-services/src/api/app-events.js";
import HandleErrors from "../billing-services/src/utils/error-handler.js";

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Listen to Events
  appEvents(app);

  //api
  billing(app);

  // error handling
  app.use(HandleErrors);
};
