import rating from "../models/rating.js";
import service from "../models/service.js";
import servicehistory from "../models/servicehistory.js";
import staffedtechnicians from "../models/staffedtechnicians.js";
import technicians from "../models/technicians.js";

import training from "../models/training.js";
import paymenthistory from "../models/paymenthistory.js";

import {
    APIError,
    BadRequestError,
    STATUS_CODES,
  } from "../../utils/app-errors.js";

 
  class TechnicianRepository {
    //rating
//create 
    async addrating({ data }) {
   
      try {
        const rating = new rating(data);

        rating.save();
        return res.status(201).json(rating);
       
      } catch (err) {
        throw new APIError(
          "API Error",
          STATUS_CODES.INTERNAL_ERROR,
          `Unable to Create product ${err.message}`
        );
      }
    }
 
 //update
 async Updaterating() {
   
  try {
 rating.findById(req.params.ratingId, (err, rating) => {
  if (err) {
    return res.send(err);
  }
  rating.status = req.body.brand;
  rating.save((err) => {
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

async Getrating({ data }) {
  try{
rating.find({data}, (err, products) => {
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
  

// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });
  
// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }


//service

//create 
async addservice({ data }) {
   
  try {
    const service = new service(data);

    service.save();
    return res.status(201).json(service);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updateservice() {

try {
service.findById(req.params.serviceId, (err, service) => {
if (err) {
return res.send(err);
}
service.status = req.body.brand;
service.save((err) => {
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

async Getservice({ data }) {
try{
service.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }





 

//servicehistory

//create 
async addservicehistory({ data }) {
   
  try {
    const servicehistory = new servicehistory(data);

    servicehistory.save();
    return res.status(201).json(servicehistory);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updateservicehistory() {

try {
servicehistory.findById(req.params.servicehistoryId, (err, servicehistory) => {
if (err) {
return res.send(err);
}
servicehistory.status = req.body.brand;
servicehistory.save((err) => {
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

async Getservicehistory({ data }) {
try{
servicehistory.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }





//staffedtechnicians

//create 
async addstaffedtechnicians({ data }) {
   
  try {
    const staffedtechnicians = new staffedtechnicians({data});

    staffedtechnicians.save();
    return res.status(201).json(staffedtechnicians);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updatestaffedtechnicians() {

try {
staffedtechnicians.findById(req.params.staffedtechniciansId, (err, staffedtechnicians) => {
if (err) {
return res.send(err);
}
staffedtechnicians.status = req.body.brand;
staffedtechnicians.save((err) => {
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

async Getstaffedtechnicians({ data }) {
try{
staffedtechnicians.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }





//technicians

//create 
async addtechnicians({ data }) {
   
  try {
    const technicians = new technicians(data);

    technicians.save();
    return res.status(201).json(technicians);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updatetechnicians() {

try {
technicians.findById(req.params.techniciansId, (err, technicians) => {
if (err) {
return res.send(err);
}
technicians.status = req.body.brand;
technicians.save((err) => {
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

async Gettechnicians({ data }) {
try{
technicians.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }


 

//training

//create 
async addtraining({ data }) {
   
  try {
    const training = new training(data);

    training.save();
    return res.status(201).json(training);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updatetraining() {

try {
training.findById(req.params.trainingId, (err, training) => {
if (err) {
return res.send(err);
}
training.status = req.body.brand;
training.save((err) => {
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

async Gettraining({ data }) {
try{
training.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }


 
 

//paymenthistory

//create 
async addpaymenthistory({ data }) {
   
  try {
    const paymenthistory = new paymenthistory(data);

    paymenthistory.save();
    return res.status(201).json(paymenthistory);
   
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      `Unable to Create product ${err.message}`
    );
  }
}

//update
async Updatepaymenthistory() {

try {
paymenthistory.findById(req.params.paymenthistoryId, (err, paymenthistory) => {
if (err) {
return res.send(err);
}
paymenthistory.status = req.body.brand;
paymenthistory.save((err) => {
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

async Getpaymenthistory({ data }) {
try{
paymenthistory.find({data}, (err, products) => {
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


// //to display  by id

//  async Productfind (req, res) {
//   try {
//     const query = {};
//     if (req.query.status) {
//       query.status = req.query;
//     }
//     Product.findById(req.params.productId, (err, product) => {
//       if (err) {
//         return res.send(err);
//       }
//       return res.json(product);
//     });

// }catch (err) {
//   throw new APIError(
//     "API Error",
//     STATUS_CODES.INTERNAL_ERROR,
//     `Unable to Update product ${err.message}`
//   );
// }
//  }


 
 
 
  }



    export default TechnicianRepository;