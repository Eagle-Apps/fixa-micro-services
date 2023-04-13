import NotificationService from "../service/notificationService.js";
import { SubscribeMessage } from "../utils/index.js";

export const notification = (app, channel) => {
  const service = new NotificationService(channel);
  // listen to events from other services
  SubscribeMessage(channel, service);

  app.get("/", async (req, res, next) => {
    try {
      res.send({ notifSays: "everything soft here ci" });
    } catch (err) {
      next(err);
    }
  });
};
