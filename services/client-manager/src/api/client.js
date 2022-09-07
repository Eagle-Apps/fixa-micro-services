import ClientService from "../service/clientServices.js";

export const client = (app) => {
  const service = new ClientService();

  app.post("/signin", async (req, res, next) => {
    try {
    } catch (err) {}
  });

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
      console.log(err);
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
};
