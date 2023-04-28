import ServiceService from "../service/ServiceServices.js";

export const service = (app) => {
  const service = new ServiceService();

  app.get("/", async (req, res, next) => {
    try {
      res.send({ specialsSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });
  //displaying all the cartegories
  app.get("/categories", async (req, res, next) => {
    try {
      const data  = await service.Getcategories();
      
      return res.send(data);
    } catch (err) {
      next(err);
    }
  });

  //creating or adding a new product
  app.post("/categories/add", async (req, res, next) => {
    try {
      const {
        categories
      } = req.body;
     
      const data  = await service.Createcategories(categories);
       console.log(data);

      return res.status(201).send({data});
    } catch (err) {
      next(err);
    }
  });


  //displaying details of a particular product using it's unique id
  app.get("/products/:productId", async (req, res, next) => {
    try {
      const query = {};
      if (req.query.status) {
        query.status = req.query;
      }
      const data  = await service.Productfind(req.params.productId);

      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  //displaying all the products
  app.get("/products", async (req, res, next) => {
    try {
      const data  = await service.Getproduct();
      
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  //creating or adding a new product
  app.post("/products/add", async (req, res, next) => {
    try {
      const {
        name,
        image,
        icon,
        price,
        categories,
        description
      } = req.body;
     
      const data  = await service.CreateProduct({ name,
        image,
        icon,
        price,
        categories,
        description});
        console.log(data);

      return res.status(201).send({data});
    } catch (err) {
      next(err);
    }
  });

  //updating any of the properties of a particular product
  app.put("/products/update/:productId", async (req, res, next) => {
    
      const {
        name,
        image,
        icon,
        price,
        categories,
        description
      } = req.body;
      const query = {};
      if (req.query.status) {
        query.status = req.query;
      }
     const _id=req.params.productId;
     try {
      const data= await service.Updateproduct({
        name,
        image,
        icon,
        price,
        categories,
        description,
        _id
      });
 console.log(data);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  });
};
