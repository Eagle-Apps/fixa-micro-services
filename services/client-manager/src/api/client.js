import ClientService from "../service/clientServices.js";
import { PublishTechnicianEvent } from "../utils/index.js";

export const client = (app) => {
  const service = new ClientService();

  app.post("/register", async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
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
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
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

  app.post("/editprofile", async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
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

  app.post("/forgotpassword", async (req, res, next) => {
    try {
      const { email } = req.body;

      const { data } = await service.ForgotPassword({ email });

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

  app.get("/fetchtechnicians", async (req, res, next) => {
    const { category, location } = req.query;

    try {
      const jobTitle = new RegExp(category, "i");

      const payload = {
        event: "FETCH_TECHNICIANS",
        data: { jobTitle, location },
      };

      // fetch request from technician micro services
      const data = await PublishTechnicianEvent(payload);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/choosetechnician", async (req, res, next) => {
    const { technicianName, technicianId, description, schedule } = req.body;

    const { userId } = req.user;

    try {
      const { data } = await service.AddServiceRequest({
        userId,
        technicianName,
        technicianId,
        description,
        schedule,
      });

      const payload = {
        event: "CHOOSE_TECHNICIAN",
        data: { data },
      };

      // fetch request from tecnician micro services
      PublishTechnicianEvent(payload);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
