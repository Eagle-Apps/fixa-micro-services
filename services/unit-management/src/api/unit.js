import UnitService from "../service/unitService.js";
import { PublishClientEvent } from "../utils/index.js";

export const unit = (app) => {
  const service = new UnitService();

  app.post("/createunit", async (req, res, next) => {
    const { unitName, category, model, modelNum, clientId } = req.body;

    try {
      const { data } = await service.CreateUnit({
        unitName,
        category,
        model,
        modelNum,
      });

      const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      PublishClientEvent(payload);
      return res.json({ message: "unit created", data });
    } catch (err) {
      next(err);
    }
  });

  app.post("/updateunit", async (req, res, next) => {
    const { unitName, category, model, modelNum, clientId } = req.body;

    try {
      const { data } = await service.UpdateUnit({
        unitName,
        category,
        model,
        modelNum,
      });

      const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      PublishClientEvent(payload);
      return res.json({ message: "unit created", data });
    } catch (err) {
      next(err);
    }
  });

  app.get("/getunit/:id", async (req, res, next) => {
    const unitid = req.params.id;

    try {
      const { data } = await service.GetUnit(unitid);
      return res.json({ message: "unit created", data });
    } catch (err) {
      next(err);
    }
  });
};