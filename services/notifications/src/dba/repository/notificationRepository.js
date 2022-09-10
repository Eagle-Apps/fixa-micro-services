import { notificationModel } from "../models/notification.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import { notification } from "../../api/notification.js";

//Dealing with database operations
class NotificationRepository {
 //add ticket
  async addnotification({
    alertid,
      userid,
      message,
      status,
      servicee,
      date,
      piority}) {
    try {
      const notification = new notificationModel({
        alertid,
      userid,
      message,
      status,
      servicee,
      date,
      piority
      });
      const notificationResult = await notification.save();
      return notificationResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Client"
      );
    }
  }


  //update
 async Updatenotification() {
   
  try {
 notification.findById(req.params.notificationId, (err, notification) => {
  if (err) {
    return res.send(err);
  }
  notification.status = req.body.brand;
  notification.save((err) => {
    if (err) {
      return res.send(err);
    }
    return res.json(product);
  });
});
}catch (err) {
  throw new APIError(
    "API Error",
    STATUS_CODES.INTERNAL_ERROR,
    `Unable to Update product ${err.message}`
  );
}
 }

//to display 

async Getnotification({ data }) {
  try{
notification.find({data}, (err, products) => {
  if (err) {
    return res.send(err);
  }
  return res.json(products);
});
 
}catch (err) {
  throw new APIError(
    "API Error",
    STATUS_CODES.INTERNAL_ERROR,
    `Unable to Update product ${err.message}`
  );
}
 }
  

}

export default NotificationRepository;
