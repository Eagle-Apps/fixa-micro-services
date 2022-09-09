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
};
