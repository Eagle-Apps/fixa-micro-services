import { clientModel } from "../models/client.js";
import { TokenModel } from "../models/token.js";
import crypto from "crypto";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class ClientRepository {
  async FindExistingClient({ email }) {
    try {
      const existingClient = await clientModel.findOne({ email });
      return existingClient;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      );
    }
  }

  async FindExistingClientById({ id }) {
    try {
      const existingClient = await clientModel.findOne({ _id: id });
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
      let client = await clientModel.findOne({ _id: id });
      client.password = password;
      await client.save();
      return;
    } catch (err) {
      console.log("---repository----,", err);
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
}

export default ClientRepository;
