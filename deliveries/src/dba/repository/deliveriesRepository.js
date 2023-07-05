
import deliveries from "../models/deliveries.js";



import {
    APIError,
    BadRequestError,
    STATUS_CODES,
  } from "../../utils/app-errors.js";

 
  class DeliveriesRepository {
    


//create 

async addDeliveries({ 
  description,
  payer,
  price,
  dispatcher,
  time,
  location}) {
   
  try {
    const Deliveries = new deliveries({ description,
      payer,
      price,
      dispatcher,
      time,
      location});
      const clientResult = await Deliveries.save();
      return clientResult;
    
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async UpdateDeliveries() {

try {
deliveries.findById(req.params.deliveriersId, (err, deliveries) => {
if (err) {
return res.send(err);
}
deliveries.status = req.body.brand;
deliveries.save((err) => {
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

async getDeliveries() {
try{
const request = deliveries.find( (err, request) => {
if (err) {
return res.send(err);
}
return request;
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



    export default DeliveriesRepository;