import ServiceService from "../service/ServiceServices.js";

export const service = (app) => {
  const service = new ServiceService();

  app.get("/", async (req, res, next) => {
    try {
      res.send({ serviceSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  //displaying details of a particular product using it's unique id
  app.get("/products/:productId", async (req, res, next) => {
    try {
      const data  = await service.Productfind();

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  });
  //displaying all the products
  app.get("/products", async (req, res, next) => {
    try {
      const  data  = await service.Getproduct();

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  //creating or adding a new product
  app.post("/add", async (req, res, next) => {
    try {
      const {
        name,
        image,
        icon,
        price,
        categories
      } = req.body;

      const data  = await service.CreateProduct({ name,
        image,
        icon,
        price,
        categories});
        console.log(data);

      return res.status(201).send({data});
    } catch (err) {
      next(err);
    }
  });

  //updating any of the properties of a particular product
  app.put("/products/:productId/update", async (req, res, next) => {
    try {
      const {
        name,
        image,
        icon,
        price,
        categories
      } = req.body;
      const data  = await service.productUpdate({
        name,
        image,
        icon,
        price,
        categories
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
