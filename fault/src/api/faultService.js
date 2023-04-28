import FaultService from "../service/faultServices.js";
import { SubscribeMessage } from "../utils/index.js";

export const fault = (app, channel) => {
  const service = new FaultService(channel);

  // listen to events from other services
  // SubscribeMessage(channel, service);

  app.get("/", async (req, res, next) => {
    try {
      res.send({ faultSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });


  app.post("/servicerequest", async (req, res, next) => {
   const {userId,
    location,
    description,
    schedule}= req.body;
    try {
      const { data } = await service.AddServiceRequest(userId,
        location,
        description,
        schedule);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  

  app.get("/fetchtask", async (req, res, next) => {
    try {
      const { data } = await service.FetchAllRequests();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/fetchtask/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const { data } = await service.FetchSingleRequest(id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/assigntask", async (req, res, next) => {
    const { requestId, technicianId, billingId } = req.body;

    try {
      const data  = await service.AssignTaskByAdmin({
        requestId,
        technicianId,
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
  // app.post("/accepttask", async (req, res, next) => {
  //   const { requestId, TechnicianId } = req.body;

  //   try {
  //     const { data } = await service.AcceptTask({
  //       requestId,
  //       TechnicianId,
  //     });

  //     return res.json(data);
  //   }

  // app.post("/", async (req, res, next) => {
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
  //     // PublishNotificationEvent(payload);
  //     PublishMessage(channel, NOTIFICATION_SERVICE, JSON.stringify(payload));

  //     return res.json({
  //       message: "request created, assigning tecnician in progress",
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // });
};
