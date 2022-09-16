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
  DB_URL: process.env.MONGODB_URL,
  APP_SECRET: process.env.APP_SECRET,
};
