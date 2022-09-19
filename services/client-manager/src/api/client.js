import ClientService from "../service/clientServices.js";
import {
  PublishFaultManagementEvent,
  PublishNotificationEvent,
} from "../utils/index.js";

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

      payload = {
        event: "SIGN_UP",
        data,
      };

      PublishNotificationEvent(payload);

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

      payload = {
        event: "EMAIL_VERIFICATION",
        data,
      };

      PublishNotificationEvent(payload);

      return res.json({ message: "email have been sent" });
    } catch (err) {
      next(err);
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

      PublishNotificationEvent(payload);

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

      PublishNotificationEvent(payload);
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
};
