import unitService from "../service/unitServices.js";

export const Unit = (app) => {
  const service = new unitService();


  app.post("/createunit", async (req, res, next) => {
    try {
      const {
        unitId,
        userId,
        category,
        unitName,
        description,
        address,
        city,
        state,
        zipCode,
      } = req.body;

      const { data } = await service.createUnit({
        unitId,
        userId,
        category,
        unitName,
        description,
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

  app.post("/addUnit", async (req, res, next) => {
    try {
      const {  
        unitId,
        userId,
        category,
        unitName,
        description,
        address,
        city,
        state,
        zipCode, 
      } = req.body;

      const { data } = await service.addUnit(
        {  
          unitId,
          userId,
          category,
          unitName,
          description,
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

  app.get("/findUnit/:query", async (req, res, next) => {
    try {
      const Query = req.params.query;

      const { data } = await service.findUnit({ Query });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

};
