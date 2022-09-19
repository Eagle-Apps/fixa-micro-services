import { clientModel } from "../models/client.js";
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
  async CreateClient({
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    zipCode,
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
}

export default ClientRepository;
