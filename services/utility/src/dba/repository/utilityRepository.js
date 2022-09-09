import { Product } from "../models/product.js";


import {
    APIError,
    BadRequestError,
    STATUS_CODES,
  } from "../../utils/app-errors.js";

  class UtilityRepository {
//create utility
    async Createproduct({ data }) {
   
      try {
        const product = new Product(data);

        product.save();
        return res.status(201).json(product);
       
      } catch (err) {
        throw new APIError(
          "API Error",
          STATUS_CODES.INTERNAL_ERROR,
          `Unable to Create product ${err.message}`
        );
      }
    }
 
 //update
 async Updateproduct({ data }) {
   
  try {
 Product.findById(req.params.productId, (err, product) => {
  if (err) {
    return res.send(err);
  }
  product.brand = req.body.brand;
  product.source = req.body.source;
  product.time_of_production = req.body.time_of_production;
  product.operating_conditions = req.body.operating_conditions;
  product.state = req.body.state;
  product.min_lifespan = req.body.min_lifespan;
  product.max_lifespan = req.body.max_lifespan;
  product.average_lifespan = req.body.average_lifespan;
  product.popular_use_regions = req.body.popular_use_regions;
  product.min_cost = req.body.min_cost;
  product.max_cost = req.body.max_cost;
  product.avg_cost = req.body.avg_cost;
  product.user_feedback = req.body.user_feedback;
  product.common_faults = req.body.common_faults;
  product.save((err) => {
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



//to display all product properties

async Getproduct({ data }) {
  try{
Product.find(query, (err, products) => {
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
  

//to display a particular product by id

 async Productfind (req, res) {
  try {
    const query = {};
    if (req.query.status) {
      query.status = req.query;
    }
    Product.findById(req.params.productId, (err, product) => {
      if (err) {
        return res.send(err);
      }
      return res.json(product);
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



    export default UtilityRepository;