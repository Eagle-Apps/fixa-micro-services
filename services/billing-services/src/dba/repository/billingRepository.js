import { clientModel } from "../models/client.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class BillingRepository {
 //add ticket
  async addticket({
    invoiceid,
      item1particulars,
      item1amount,
      item2particulars,
      item2amount,
      item3particulars,
      item3amount,
      item4particulars,
      item4amount,
      item5particulars,
      item5amount,
      discount,
      vat,
      amount,
      finalamount, 
      option,
      status }) {
    try {
      const billing = new billingModel({
        invoiceid,
        item1particulars,
        item1amount,
        item2particulars,
        item2amount,
        item3particulars,
        item3amount,
        item4particulars,
        item4amount,
        item5particulars,
        item5amount,
        discount,
        vat,
        amount,
        finalamount, 
        option,
        status 
      });
      const clientResult = await client.save();
      return clientResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Client"
      );
    }
  }


  //update
 async Updateticket() {
   
  try {
 billing.findById(req.params.billingId, (err, billing) => {
  if (err) {
    return res.send(err);
  }
  billing.status = req.body.brand;
  billing.save((err) => {
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

async Getticket({ data }) {
  try{
billing.find({data}, (err, products) => {
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

export default BillingRepository;
