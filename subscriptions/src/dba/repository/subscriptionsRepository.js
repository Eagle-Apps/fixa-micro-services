import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {subscriptionsModel} from "../models/subscriptions.js";

//Dealing with database operations
class SubscriptionsServiceRepository {
  
 
  async CreateSubscriptions( {serviceid,
    clientid,
    date,
    time,
    schedule,
    status, 
     }) {
    try {
      const unit =  {serviceid,
        clientid,
        date,
        time,
        schedule,
        status,
         };
      const newUnit = new subscriptionsModel(unit);
      newUnit.save();
      return newUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateSubscriptions(serviceid,
    clientid,
    date,
    time,
    schedule,
    status,
    id) {
    try {
      const filter = { _id:id };
      const update = {
        serviceid,
        clientid,
        date,
        time,
        schedule,
        status,
      };
      const updatedUnit = await subscriptionsModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return updatedUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FetchSubscriptions(id) {
    try {
      const unit = subscriptionsModel.findById(id);
      return unit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

async FetchallSubscriptions() {
  try {
    const unit = await subscriptionsModel.find();
    return unit;
  } catch (err) {
    throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  }
}
}

export default SubscriptionsServiceRepository;
