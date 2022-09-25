import NotificationServices from "../service/notificationServices.js";

export const appEvents = (app) => {
  const service = new FaultServices();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log(
      "===============  notification-management Service Received Event ====== "
    );
    return res.status(200).json(payload);
  });
};
