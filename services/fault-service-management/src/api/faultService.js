import FaultService from "../service/faultServices.js";
import {
  PublishBillingEvent,
  PublishClientEvent,
  PublishNotificationEvent,
  PublishTechnicianEvent,
} from "../utils/index.js";

export const fault = (app) => {
  const service = new FaultService();

<<<<<<< Updated upstream
  // app.post("/request-variable-service", async (req, res, next) => {
  //   const { description, schedule, serviceCategory } = req.body;

  //   const { userId } = req.user;

  //   try {
  //     //create new service request
  //     const { data } = await service.AddServiceRequest({
  //       userId,
  //       description,
  //       schedule,
  //     });

  //     // handle all notifications

  //     const payload = { event: "VARIABLE_SERVICE", data };
  //     PublishNotificationEvent(payload);

  //     return res.json({
  //       message: "request created, assigning tecnician in progress",
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // });
=======
  app.get("/fetchtasks", async (req, res, next) => {
    try {
      const { data } = await service.GetAllRequests();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/fetchtask/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const { data } = await service.GetRequest(id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/assigntasks", async (req, res, next) => {
    const { requestId, TechnicianId } = req.body;

    try {
      const { data } = await service.AssignTaskByAdmin({
        requestId,
        TechnicianId,
        billingId,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/declinetask", async (req, res, next) => {
    const { requestId, TechnicianId } = req.body;

    try {
      const { data } = await service.DeclineTask({
        requestId,
        TechnicianId,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
  app.post("/accepttask", async (req, res, next) => {
    const { requestId, TechnicianId } = req.body;

    try {
      const { data } = await service.AcceptTask({
        requestId,
        TechnicianId,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
>>>>>>> Stashed changes
};
