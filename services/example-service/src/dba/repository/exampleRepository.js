import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors";

//Dealing with database operations
class ExampleRepository {
  async CreateOperation() {
    try {
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create"
      );
    }
  }
}

export default ExampleRepository;
