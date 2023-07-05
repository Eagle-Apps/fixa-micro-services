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

// -----connect to client micro-secrvice----//

export const PublishClientEvent = async (payload) => {
  axios.post("http://localhost:8001/client/app-events", {
    payload,
  });
};

// -----connect to notification micro-secrvice----//

export const PublishNotificationEvent = async (payload) => {
  axios.post("http://localhost:8004/notification/app-events", {
    payload,
  });
};
