import { Service } from "../models/service.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

class ServiceRepository {
  //create service
  async Createproduct({name,
    image,
    icon,
    price,
    categories}) {
    try {
      const product = new Service({name,
        image,
        icon,
        price,
        categories});

      product.save();
      
      return product;
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
      Service.findById(req.params.productId, (err, product) => {
        if (err) {
          return res.send(err);
        }
        image = req.body.image,
        icon = req.body.icon,
        price= req.body.price,
        categories = req.body.categories,
        product.save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json(product);
        });
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display all product properties

  async Getproduct({ data }) {
    try {
      Service.find((err, products) => {
        if (err) {
          return res.send(err);
        }
        console.log(err);
        return products;
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display a particular product by id

  async Productfind(req, res) {
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
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }
}

export default ServiceRepository;
