import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import { configs } from "../config/index.js";
const { APP_SECRET } = configs;

//Utility functions

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
