// import NotificationServices from "../service/notificationServices.js";

export const appEvents = (app) => {
  const service = new FaultServices();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.PropertyEvents(payload);

    console.log(
      "===============  unit-management Service Received Event ====== "
    );
    return res.status(200).json(payload);
  });
};
