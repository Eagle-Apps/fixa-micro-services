import UtilityService from "../service/UtilityServices.js";

export const utility = (app) => {
  const service = new UtilityService();

  app.get("/", async (req, res, next) => {
    try {
      res.send({ utilitySays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  //displaying details of a particular product using it's unique id
  app.get("/products/:productId", async (req, res, next) => {
    try {
      const { data } = service.Productfind();

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //displaying all the products
  app.get("/products", async (req, res, next) => {
    try {
      const { data } = service.GetProduct();

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });

  //creating or adding a new product
  app.post("/add", async (req, res, next) => {
    try {
      const {
        brand,
        source,
        time_of_production,
        operating_conditions,
        state,
        min_lifespan,
        max_lifespan,
        average_lifespan,
        popular_use_regions,
        min_cost,
        max_cost,
        avg_cost,
        user_feedback,
        common_faults,
      } = req.body;

      const { data } = service.CreateProduct();

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });

  //updating any of the properties of a particular product
  app.put("/products/:productId/update", async (req, res, next) => {
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
      const { data } = await service.productUpdate({
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
};
