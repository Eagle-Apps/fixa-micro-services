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
    const {FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
      Dpartment,
      Roles,
      } = req.body;

    try {
      const { data } = await service.CreateStaff({
       FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
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
    const {FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
      Dpartment,
      Roles,} = req.body;
    const query = {};
    if (req.query.status) {
      query.status = req.query;
    }
    const id= req.params.id;
    try {
      const { data } = await service.UpdateStaff(
        FirstName,
        LastName,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        EmploymentDate,
        ProfilePic,
        PhoneNumber,
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
