import dotEnv from "dotenv";
dotEnv.config();

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
//   console.log("🚀 ~ file: index.js ~ line 12 ~ connect ~ e", process.env);
// }

export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  CLIENT_SERVICE: "client_service",
  FAULT_SERVICE: "fault_service",
  NOTIFICATION_SERVICE: "notification_service",
  TECHNICIAN_SERVICE: "technician_service",
};
