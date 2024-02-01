// import NotificationServices from "../service/notificationServices.js";
import RecyclingService from "../service/recyclingService.js";

export const appEvents = (app) => {
  const service = new RecyclingService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log(
      "===============  recycling-management Service Received Event ====== "
    );
    return res.status(200).json(payload);
  });
};
