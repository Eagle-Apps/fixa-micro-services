import UnitService from "../service/unitServices.js";

export const appEvents = (app) => {
  const service = new UnitService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log(
      "===============  unit-management Service Received Event ====== "
    );
    return res.status(200).json(payload);
  });
};
