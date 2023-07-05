import PropertyService from "../service/PropertyService.js";
import { PublishClientEvent } from "../utils/index.js";

export const property = (app) => {
  const service = new PropertyService();

 app.get("/", async (req, res, next) => {
    try {
      res.send({ propertySays: "everything soft here" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/createproperty", async (req, res, next) => {
    const {typebuilding,
      address,
      sizebuilding,
      occupants,
      ownerName,
  
      manageName,
      managePhone,
      manageAddress,} = req.body;

    try {
      const { data } = await service.CreateProperty({
        typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
      });

      // const payload = await service.CreatePayload("NEW_UNIT", data, clientId);
      // PublishClientEvent(payload);
      return res.json({ message: "created", data });
    } catch (err) {
      next(err);
    }
  });

  app.patch('/updateproperty/:id', async (req, res, next) => {
    const {
      typebuilding,
      address,
      sizebuilding,
      occupants,
      ownerName,
  
      manageName,
      managePhone,
      manageAddress,
    } = req.body
    const id = req.params.id
    try {
      const { data } = await service.UpdateProperty({
        id,
        typebuilding,
        address,
        sizebuilding,
        occupants,
        ownerName,
    
        manageName,
        managePhone,
        manageAddress,
      })
      // return res.json(data)
      res.status(200).json({
        status: 'success',
        data: {
          data: data,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: next(err),
      })
      // console.log(err)
      // next(err)
    }
  })


  app.get("/get/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
      const { data } = await service.GetProperty(id);
      return res.json({ message: " found", data });
    } catch (err) {
      next(err);
    }
  });
  app.get("/getproperty", async (req, res, next) => {

    try {
      const { data } = await service.GetallProperty();
      return res.json({ message: " property found", data });
    } catch (err) {
      next(err);
    }
  });
};
