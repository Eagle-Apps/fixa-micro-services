import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import jwt from "jsonwebtoken";
import { configs } from "../config/index.js";
const { APP_SECRET } = configs;

//Utility functions
export const CreateVerificationString = async () => {
  return crypto.randomBytes(20).toString("hex");
};

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const HashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

export const CheckPassword = async (password, confirmPassword) => {
  if (password === confirmPassword) {
    return password === confirmPassword;
  }
};
export const ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

export const GenerateSignature = async (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
};

export const ValidateSignature = async (req) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  }

  return false;
};

export const FormatData = (data) => {
  console.log("-----here_---", data);
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// -----connect to technician micro-secrvice----//

export const PublishTechnicianEvent = async (payload) => {
  axios.post("http://localhost:8002/technician/app-events", {
    payload,
  });
};

export const PublishFaultManagementEvent = async (payload) => {
  axios.post("http://localhost:8003/fault/app-events", {
    payload,
  });
};
export const PublishNotificationEvent = async (payload) => {
  axios.post("http://localhost:8005/notification/app-events", {
    payload,
  });
};
