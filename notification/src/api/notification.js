import NotificationService from "../service/notificationService.js";
import InAppMessagingService from "../service/inAppMessagingServices.js"
import { SubscribeMessage } from "../utils/index.js";

export const notification = (app, channel) => {
  const service = new NotificationService(channel);
  const messageingservice = new InAppMessagingService(channel);

  // listen to events from other messageingservices
  // SubscribeMessage(channel, messageingservice);

  app.get("/", async (req, res, next) => {
    try {
      res.send({ notifSays: "everything soft here from CI-CD" });
    } catch (err) {
      next(err);
    }
  });


   app.get("/getmessage", async (req, res, next) => {
    try {
      const { data } = await messageingservice.GetMessage();
      return res.json(data)
    } catch (err) {
      next(err);
    }
  });                                         

  app.get("/getmessagebyid/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const { data } = await messageingservice.GetMessageById(id);
      return res.json(data)
    } catch (err) {
      next(err);
    }
  });

 
  app.post("/sendmessage", async (req, res, next) => {
    try {
      const { data } = await messageingservice.SendMessage()
      return res.json(data)
    } catch (err) {
      next(err);
    }
  });

  app.get("/updatemessage", async (req, res, next) => {
    try {
      const { data } = await messageingservice.UpdateMessage()
      return res.json(data)
    } catch (err) {
      next(err);
    }
  });
};
