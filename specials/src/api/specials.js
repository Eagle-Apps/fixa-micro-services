import SpecialsService from "../service/specialsService.js";
import { PublishClientEvent } from "../utils/index.js";

export const specials = (app) => {
  const service = new SpecialsService();

 app.get("/", async (req, res, next) => {
    try {
      res.send({ specialsSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/create", async (req, res, next) => {
    const { title,
      description,
      discount,
      type,
      image} = req.body;

    try {
      const { data } = await service.CreateSpecials({
        title,
        description,
        discount,
        type,
        image
      });

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: "created", data });
    } catch (err) {
      next(err);
    }
  });

  app.post("/update/:id", async (req, res, next) => {
    const {title,
      description,
      discount,
      type,
      image} = req.body;
    const query = {};
    if (req.query.status) {
      query.status = req.query;
    }
    const id= req.params.id;
    try {
      const { data } = await service.UpdateSpecials(
        title,
        description,
        discount,
        type,
        image,
        id,
      );

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: " created", data });
    } catch (err) {
      next(err);
    }
  });

  app.get("/get/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
      const { data } = await service.GetSpecials(id);
      return res.json({ message: " found", data });
    } catch (err) {
      next(err);
    }
  });
  app.get("/get", async (req, res, next) => {

    try {
      const { data } = await service.GetallSpecials();
      return res.json({ message: " specials found", data });
    } catch (err) {
      next(err);
    }
  });
};
