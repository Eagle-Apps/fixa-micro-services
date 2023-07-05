import DeliveriesServices from "../service/DeliveriesServices.js";
// import {
//   PublishFaultManagementEvent,
//   PublishNotificationEvent,
// } from "../utils/index.js";

export const deliveries = (app) => {
  const service = new DeliveriesServices(); 


//rating
//displaying of fetching
app.get("/deliveries", async (req, res, next) => {
  try {
    const { data } =service.getDeliveries();
 return res.status(201).json({data});

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/deliveries", async (req, res, next) => {
  try {
   const {
    description,
    payer,
    price,
    dispatcher,
    time,
    location} = req.body
    const {data} =service.addDeliveries({
      description,
      payer,
      price,
      dispatcher,
      time,
      location});
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("/deliveries", async (req, res, next) => {
    try {
      const {
        description,
        payer,
        price,
        dispatcher,
        time,
        location,
      } = req.body;
      const { data } = await service.updateDeliveries({
        description,
        payer,
        price,
        dispatcher,
        time,
        location,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

};
