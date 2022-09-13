import bcrypt from "bcrypt";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import jwt from "jsonwebtoken";
import { configs } from "../config/index.js";
const { APP_SECRET } = configs;

//Utility functions

export const generateRequestId = async (lastid) => {
  let num = parseInt(lastid) + 1;
  let sequence = num + "";
  while (sequence.length < 6) sequence = "0" + sequence;

  let id = sequence;

  return id;
};
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password, salt) => {
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
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
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
