import rating from "../models/rating.js";
import service from "../models/service.js";
import servicehistory from "../models/servicehistory.js";
import technicians from "../models/technicians.js";

import training from "../models/training.js";
import paymenthistory from "../models/paymenthistory.js";

//technicians
import crypto from "crypto";

import { TokenModel } from "../models/token.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

class TechnicianRepository {
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
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Getservice({ data }) {
    try {
      service.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

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
      servicehistory.findById(
        req.params.servicehistoryId,
        (err, servicehistory) => {
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
        }
      );
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Getservicehistory({ data }) {
    try {
      servicehistory.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //staffedtechnicians

  //create
  async addstaffedtechnicians({ data }) {
    try {
      const staffedtechnicians = new staffedtechnicians({ data });

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
      staffedtechnicians.findById(
        req.params.staffedtechniciansId,
        (err, staffedtechnicians) => {
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
        }
      );
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Getstaffedtechnicians({ data }) {
    try {
      staffedtechnicians.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  async VerifyEmail({ token }) {
    try {
      const user = this.FindExistingClient(token, "verification_code");

      user.emailStatus = "Verified";
      user.verificationString = undefined;
      await user.save();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      );
    }
  }

  async FindExistingClient(query, queryType) {
    try {
      let existingClient;
      if (queryType === "id")
        existingClient = await technicians.findOne({ _id: query });

      if (queryType === "email")
        existingClient = await technicians.findOne({ email: query });

      if (queryType === "verification_code")
        existingClient = await technicians.findOne({
          verificationString: query,
        });

      return existingClient;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      );
    }
  }

  async UpdatePassword({ id, password }) {
    try {
      let client = await this.FindExistingClient(id, "id");
      client.password = password;
      await client.save();
      return;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      );
    }
  }

  async CreateClient({
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    zipCode,
    salt,
    verificationString,
    technicianid,
    technciantype,
    credentialtype,
    credentialfile,
    status,
  }) {
    try {
      const client = new technicians({
        name,
        name,
        email,
        password,
        phone,
        address,
        city,
        state,
        zipCode,
        salt,
        verificationString,
        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
      const clientResult = await client.save();
      return clientResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Client ${err.message}`
      );
    }
  }

  async UpdateClientProfile({
    userId,
      name,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      bankname,
      accountname,
      accountnumber,
  }) {
    try {
      const filter = { _id: userId };
      const update = {
      userId,
      name,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      wallet:{
      bankname,
      accountname,
      accountnumber},
      };
      const profile = technicians.findByIdAndUpdate(filter, update, {
        new: true,
      });

      return profile;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Client ${err.message}`
      );
    }
  }

  async FindTokenByUserTokenString({ tokenstring }) {
    try {
      let token;
      token = await TokenModel.findOne({ resetPasswordToken: tokenstring });
      return token;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FindTokenByUserId({ user }) {
    try {
      let token;
      token = await TokenModel.findOne({ userId: user._Id });

      if (!token) token = this.CreateToken(user);

      return token;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async CreateToken(user) {
    try {
      let token = await new TokenModel({
        userId: user._id,
        resetPasswordToken: crypto.randomBytes(20).toString("hex"),
      }).save();
      return token;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async AddServiceRequest({
    userId,
    technicianName,
    technicianId,
    description,
    schedule,
    requestId,
  }) {
    try {
      let user = await technicians.findOne({ _id: userId });

      const service = {
        technicianName,
        technicianId,
        description,
        schedule,
        requestId,
      };

      const newRequest = new requestModel(service);

      let request = user.serviceRequests;

      //add the requested service to user model
      request.push(newRequest._id);
      user.serviceRequests = request;
      await user.save();
      return newRequest;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async GetClientProfile({ id }) {
    try {
      const profile = await technicians.findById({ _id: id });
      // .populate({
      //   path: "serviceRequests",
      //   model: "request",
      //   select: { _id: 0 },
      // });

      return profile;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async GetClients() {
    try {
      const clients = await technicians.find();

      return clients;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  // findtechnician
  async findtechnician(service, serviceClass, long, lat) {
    try {
      const requestTechnicians = await technicians.find({
        $or: [
          { status: { $regex: "Inactive", $options: "i" } },
          { jobcategory: { $regex: service, $options: "i" } },
          { technicianCategory: { $regex: serviceClass, $options: "i" } },
        ],
      });

      return requestTechnicians;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  //create
  async addtechnicians({ data }) {
    try {
      const technician = new technicians({ data });

      technician.save();
      return res.status(201).json(technician);
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
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Gettechniciansort({ data }) {
    try {
      technicians.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  async Gettechnicians() {
    try {
      const products = technicians.find();

      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

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
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Gettraining({ data }) {
    try {
      training.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
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
      paymenthistory.findById(
        req.params.paymenthistoryId,
        (err, paymenthistory) => {
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
        }
      );
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display

  async Getpaymenthistory({ data }) {
    try {
      paymenthistory.find({ data }, (err, products) => {
        if (err) {
          return res.send(err);
        }
        return res.json(products);
      });
    } catch (err) {
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
