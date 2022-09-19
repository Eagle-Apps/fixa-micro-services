import billingRepository from "../dba/repository/billingRepository.js";
import { FormatData } from "../utils/index.js";
import {
  CheckPassword,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utils/index.js";
import {
  APIError,
  BadRequestError,
  createBadRequestError,
  createAPIError,
  STATUS_CODES,
} from "../utils/app-errors.js";

// All Business logic will be here
class billingService {
  constructor() {
    this.repository = new billingRepository();
  }

  async SignUp(userInputs) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      state,
      zipCode,
    } = userInputs;

    try {
      //check if user is already registered
      await this.repository.FindExistingbilling({
        email,
      });

      await CheckPassword(password, confirmPassword);
      let salt = await GenerateSalt();

      let hashedPassword = await GeneratePassword(password, salt);

      let createdbilling;

      createdbilling = await this.repository.Createbilling({
        name: `${lastName} ${firstName}`,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        state,
        zipCode,
      });

      const token = await GenerateSignature({
        email: email,
        _id: createdbilling._id,
      });

      return FormatData({ id: createdbilling._id, token });
    } catch (err) {
      console.log("here is the fool", err);
      throw new APIError(
        "Data Not found",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingCustomer = await this.repository.FindCustomer({ email });

      if (existingCustomer) {
        const validPassword = await ValidatePassword(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingCustomer.email,
            _id: existingCustomer._id,
          });
          return FormatData({ id: existingCustomer._id, token });
        }
      }

      return FormatData(null);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { order } = data;

    switch (event) {
      case "CREATE_ORDER":
        this.ManageOrder(userId, order);
        break;
      default:
        break;
    }
  }
}

export default billingService;
