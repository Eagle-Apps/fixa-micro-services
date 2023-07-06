import StaffService from "../service/staffService.js";
import { PublishClientEvent } from "../utils/index.js";

export const staff = (app) => {
  const service = new StaffService();

 app.get("/", async (req, res, next) => {
    try {
      res.send({ staffSays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/create", async (req, res, next) => {
    const {Firstname,
      Lastname,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      Employment_date,
      Profile_pic,
      Phone_number,
      Dpartment,
      Roles,
      } = req.body;

    try {
      const { data } = await service.CreateStaff({
        Firstname,
        Lastname,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        Employment_date,
        Profile_pic,
        Phone_number,
        Dpartment,
        Roles,
      });

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: "created", data });
    } catch (err) {
      next(err);
    }
  });

  app.post("/update/:id", async (req, res, next) => {
    const {Firstname,
      Lastname,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      Employment_date,
      Profile_pic,
      Phone_number,
      Dpartment,
      Roles,} = req.body;
    const query = {};
    if (req.query.status) {
      query.status = req.query;
    }
    const id= req.params.id;
    try {
      const { data } = await service.UpdateStaff(
        Firstname,
        Lastname,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        Employment_date,
        Profile_pic,
        Phone_number,
        Dpartment,
        Roles,
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
      const { data } = await service.GetStaff(id);
      return res.json({ message: " found", data });
    } catch (err) {
      next(err);
    }
  });
  app.get("/get", async (req, res, next) => {

    try {
      const { data } = await service.GetallStaff();
      return res.json({ message: " staff's found", data });
    } catch (err) {
      next(err);
    }
  });
};
