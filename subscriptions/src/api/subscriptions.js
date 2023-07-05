import SubscriptionsService from "../service/subscriptionsService.js";
import { PublishClientEvent } from "../utils/index.js";

export const subscriptions = (app) => {
  const service = new SubscriptionsService();

 app.get("/", async (req, res, next) => {
    try {
      res.send({ subscriptionsSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/create", async (req, res, next) => {
    const {serviceid,
      clientid,
      date,
      time,
      schedule,
      status,} = req.body;

    try {
      const { data } = await service.CreateSubscriptions({
        serviceid,
        clientid,
        date,
        time,
        schedule,
        status,
      });

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: "created", data });
    } catch (err) {
      next(err);
    }
  });

  app.post("/update/:id", async (req, res, next) => {
    const {serviceid,
      clientid,
      date,
      time,
      schedule,
      status,} = req.body;
    const query = {};
    if (req.query.status) {
      query.status = req.query;
    }
    const id= req.params.id;
    try {
      const { data } = await service.UpdateSubscriptions(
        serviceid,
        clientid,
        date,
        time,
        schedule,
        status,
        id,
      );

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: " created", data });
    } catch (err) {
      next(err);
    }
  });

  app.get("/get/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
      const { data } = await service.GetSubscriptions(id);
      return res.json({ message: " found", data });
    } catch (err) {
      next(err);
    }
  });
  app.get("/get", async (req, res, next) => {

    try {
      const { data } = await service.GetallSubscriptions();
      return res.json({ message: " subscriptions found", data });
    } catch (err) {
      next(err);
    }
  });
};
