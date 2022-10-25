import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import configs from "../config/index.js";
const { APP_SECRET } = configs;

//Utility functions

export const FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
