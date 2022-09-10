import BillingService from "../service/billingServices.js";

export const notification = (app) => {
  const notification = new NotificationService();

 
  app.post("/notification", async (req, res, next) => {
    try {const {
     alertid,
     userid,
     message,
     status,
     servicee,
     date,
     piority
    } = req.body;

    const { data } = await notification.addnotification({
      alertid,
      userid,
      message,
      status,
      servicee,
      date,
      piority
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});



  
  app.get("/notification", async (req, res, next) => {
    try {
    const { data } = await notification.Getnotification({
      
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});





  app.put("/notification", async (req, res, next) => {
    try {const {
      alertid,
      userid,
      message,
      status,
      servicee,
      date,
      piority
    } = req.body;

    const { data } = await notification.Updatenotification({
      alertid,
      userid,
      message,
      status,
      servicee,
      date,
      piority
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});


};
