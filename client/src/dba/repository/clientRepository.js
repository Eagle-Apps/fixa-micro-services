import crypto from "crypto";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import { clientModel } from "../models/client.js";
import { TokenModel } from "../models/token.js";
import { requestModel } from "../models/serviceRequest.js";

//Dealing with database operations
class ClientRepository {
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
        existingClient = await clientModel.findOne({ _id: query });

      if (queryType === "email")
        existingClient = await clientModel.findOne({ email: query });

      if (queryType === "verification_code")
        existingClient = await clientModel.findOne({
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
  }) {
    try {
      const client = new clientModel({
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
    salt,
  }) {
    try {
      const filter = { _id: userId };
      const update = {
        name,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        salt,
      };
      const profile = clientModel.findByIdAndUpdate(filter, update, {
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
      let user = await clientModel.findOne({ _id: userId });

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

  async GetClientProfile(id) {
    try {
      const profile = await clientModel.findById({ _id: id }).populate({
        path: "serviceRequests",
        model: "request",
        select: { _id: 0 },
      });

      return profile;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async GetClients() {
    try {
      const clients = await clientModel.find().populate({
        path: "serviceRequests",
        model: "request",
        select: { _id: 0 },
      });

      return clients;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }
}

export default ClientRepository;
