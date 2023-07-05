import express from "express";
import cors from "cors";
import { payment } from "./src/api/payment.js";
import HandleErrors from "./src/utils/error-handler.js";

export const expressApp = async (app, channel) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //api
  payment(app, channel);

  // error handling
  app.use(HandleErrors);
};
