import FaultService from "../service/faultServices.js";
import {
  PublishBillingEvent,
  PublishClientEvent,
  PublishNotificationEvent,
  PublishTechnicianEvent,
} from "../utils/index.js";

export const fault = (app) => {
  const service = new FaultService();

  app.post("/", async (req, res, next) => {
    const { description, schedule, serviceCategory } = req.body;

    const { userId } = req.user;

    try {
      //create new service request
      const { data } = await service.AddServiceRequest({
        userId,
        description,
        schedule,
      });

      // handle all notifications

      const payload = { event: "VARIABLE_SERVICE", data };
      PublishNotificationEvent(payload);

      return res.json({
        message: "request created, assigning tecnician in progress",
      });
    } catch (err) {
      next(err);
    }
  });
};
