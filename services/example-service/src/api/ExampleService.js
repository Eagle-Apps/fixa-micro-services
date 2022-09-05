import ExampleBusinessService from "../service/service-buisiness-logic.js";

export const exampleServive = (app) => {
  const service = new ExampleBusinessService();

  app.post("/", async (req, res, next) => {
    // eg service.some_function()
  });
};
