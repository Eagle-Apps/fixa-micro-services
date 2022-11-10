import TechnicianService from "../service/TechnicianServices.js";
import { PublishMessage, SubscribeMessage } from "../utils/index.js";
import { configs } from "../config/index.js";
import { json } from "stream/consumers";
const { NOTIFICATION_SERVICE } = configs;

export const technician = (app, channel) => {
  const service = new TechnicianService(channel);

  // listen to events from other services
  SubscribeMessage(channel, service);

  app.get("/", async (req, res, next) => {
    try {
      res.send({ technicianSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  //rating
  //displaying of fetching
  app.get("/rating", async (req, res, next) => {
    try {
      const { data } = service.Getrating();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //creating or adding
  app.post("/rating", async (req, res, next) => {
    try {
      const { ratingid, quality, cost, promptness, technicianid } = req.body;
      const { data } = service.addrating();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("rating", async (req, res, next) => {
    try {
      const { ratingid, quality, cost, promptness, technicianid } = req.body;
      const { data } = await service.Updaterating({
        ratingid,
        quality,
        cost,
        promptness,
        technicianid,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //service

  //displaying of fetching
  app.get("/service", async (req, res, next) => {
    try {
      const { data } = service.Getservice();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //creating or adding
  app.post("/service", async (req, res, next) => {
    try {
      const { jobytype, jobcategory, pricerange, serviceimage, technicianid } =
        req.body;
      const { data } = service.addservice();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("service", async (req, res, next) => {
    try {
      const { jobytype, jobcategory, pricerange, serviceimage, technicianid } =
        req.body;
      const { data } = await service.Updateservice({
        jobytype,
        jobcategory,
        pricerange,
        serviceimage,
        technicianid,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //servicehistory

  //displaying of fetching
  app.get("/servicehistory", async (req, res, next) => {
    try {
      const { data } = service.Getservicehistory();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //creating or adding
  app.post("/servicehistory", async (req, res, next) => {
    try {
      const { technicianid, serviceid, rating, date, status } = req.body;
      const { data } = service.addservicehistory();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("servicehistory", async (req, res, next) => {
    try {
      const { technicianid, serviceid, rating, date, status } = req.body;
      const { data } = await service.Updateservicehistory({
        technicianid,
        serviceid,
        rating,
        date,
        status,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //technicians

  app.post("/register", async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        phone,
        address,
        city,
        state,
        zipCode,
      } = req.body;

      const { data } = await service.SignUp({
       name,
        email,
        password,
        confirmPassword,
        phone,
        address,
        city,
        state,
        zipCode,
      });

      const payload = {
        event: "SIGN_UP",
        data,
      };

      // PublishNotificationEvent(payload);
      PublishMessage(
        this.channel,
        NOTIFICATION_SERVICE,
        JSON.stringify(payload)
      );

      return res.json({"message" : "sucessfully signed up", "data":data } );

    } catch (err) {
      next(err);
    }
  });

  app.post("/editprofile", async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
      } = req.body;

      const { data } = await service.UpdateClientProfile({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/getverificationemail", async (req, res, next) => {
    const { userId } = req.user;

    try {
      const { data } = await service.SendEmailVerifcation({ userId });

      const payload = {
        event: "EMAIL_VERIFICATION",
        data,
      };

      NOTIFICATION_SERVICE, JSON.stringify(payload);

      return res.json({ message: "email have been sent" });
    } catch (err) {
      err.message;
    }
  });

  app.put("/verifyemail", async (req, res, next) => {
    const { userId } = req.user;
    const { token } = req.body;

    try {
      const { data } = await service.VerifyEmail({ userId, token });

      payload = {
        event: "EMAIL_VERIFICATION_SUCCESS",
        data,
      };

      // PublishNotificationEvent(payload);
      PublishMessage(
        this.channel,
        NOTIFICATION_SERVICE,
        JSON.stringify(payload)
      );

      return res.json({ message: "email have been sent" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/forgotpassword", async (req, res, next) => {
    try {
      const { email } = req.body;

      const { data } = await service.ForgotPassword({ email });

      const payload = {
        event: "FORGOT_PASSWORD",
        data,
      };

      // PublishNotificationEvent(payload);
      PublishMessage(
        this.channel,
        NOTIFICATION_SERVICE,
        JSON.stringify(payload)
      );
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/fetchclient/:id", async (req, res, next) => {
    try {
      const id = req.params.id;

      const { data } = await service.GetProfile({ id });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/fetchclients", async (req, res, next) => {
    try {
      const { data } = await service.GetAllClients();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/checklink/:token", async (req, res, next) => {
    try {
      const tokenstring = req.params.token;

      const { data } = await service.CheckResetLink({ tokenstring });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/resetpassword", async (req, res, next) => {
    try {
      const { id, password, confirmPassword } = req.body;
      const { data } = await service.ResetPassword({
        id,
        password,
        confirmPassword,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/request-service", async (req, res, next) => {
    const { description, schedule, serviceCategory } = req.body;

    const { userId } = req.user;

    try {
      const { data } = await service.GetProfile({ userId });

      const payload = {
        event: "REQUEST_SERVICE",
        data: {
          requestInfo: { description, schedule, serviceCategory },
          userInfo: {
            clientId: data._id,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            clientCategory: data.category,
          },
        },
      };

      PublishFaultManagementEvent(payload);

      const messagePayload = {
        event: "REQUEST_SERVICE",
        data: {
          email: data.email,
          clientName: data.name,
          clientPhone: data.phone,
        },
      };
      PublishNotificationEvent(messagePayload);

      return res.json({
        message: "request dispatched",
      });
    } catch (err) {
      next(err);
    }
  });

  //displaying of fetching
  app.get("/technicians", async (req, res, next) => {
    try {
      const { data } = service.Gettechnicians();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //creating or adding
  app.post("/technicians", async (req, res, next) => {
    try {
      const {
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      } = req.body;
      const { data } = service.addtechnicians({
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("technicians", async (req, res, next) => {
    try {
      const {
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      } = req.body;
      const { data } = await service.Updatetechnicians({
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //training

  //displaying of fetching
  app.get("/training", async (req, res, next) => {
    try {
      const { data } = service.Gettraining();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });

  //creating or adding
  app.post("/training", async (req, res, next) => {
    try {
      const { organisationid, jobcategory, staffid, deparment } = req.body;
      const { data } = service.addtraining();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("training", async (req, res, next) => {
    try {
      const { organisationid, jobcategory, staffid, deparment } = req.body;
      const { data } = await service.Updatetraining({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //paymenthistory

  //displaying of fetching
  app.get("/paymenthistory", async (req, res, next) => {
    try {
      const { data } = paymenthistory.Getpaymenthistory();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //creating or adding
  app.post("/paymenthistory", async (req, res, next) => {
    try {
      const { organisationid, jobcategory, staffid, deparment } = req.body;
      const { data } = paymenthistory.addpaymenthistory();
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //updating any of the properties
  app.put("paymenthistory", async (req, res, next) => {
    try {
      const { organisationid, jobcategory, staffid, deparment } = req.body;
      const { data } = await service.Updatepaymenthistory({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
