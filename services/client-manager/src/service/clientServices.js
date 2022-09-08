import ClientRepository from "../dba/repository/clientRepository.js";
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
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import { verifyemail, forgotPassword, signupSuccess } from "../mail/mailgun.js";

// All Business logic will be here
class ClientService {
  constructor() {
    this.repository = new ClientRepository();
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
      const existingClient = await this.repository.FindExistingClient({
        email,
      });

      const passwordMatch = await CheckPassword(password, confirmPassword);
      if (!existingClient) {
        if (passwordMatch) {
          let salt = await GenerateSalt();

          let hashedPassword = await GeneratePassword(password, salt);

          const createdClient = await this.repository.CreateClient({
            name: `${lastName} ${firstName}`,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            state,
            zipCode,
            salt,
          });

          const token = await GenerateSignature({
            email: email,
            _id: createdClient._id,
          });

          signupSuccess(createdClient.name, email, password);

          return FormatData({ id: createdClient._id, token });
        } else {
          throw new BadRequestError("passwords does not match", true);
        }
      } else {
        throw new BadRequestError("user with this email already exist", true);
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingClient = await this.repository.FindExistingClient({
        email,
      });

      if (existingClient) {
        const validPassword = await ValidatePassword(
          password,
          existingClient.password,
          existingClient.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingClient.email,
            _id: existingClient._id,
          });
          return FormatData({ id: existingClient._id, token });
        } else {
          throw new ValidationError("invalid credentials", true);
        }
      } else {
        throw new BadRequestError("user with the email does not exist", true);
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async ForgotPassword(userInputs) {
    const { email } = userInputs;

    try {
      const existingClient = await this.repository.FindExistingClient({
        email,
      });

      if (existingClient) {
        const token = await this.repository.FindTokenByUserId({
          user: existingClient,
        });

        const link = `https://fixa.com.ng/passwordreset/?token=${token.resetPasswordToken}&id=${existingClient._id}&email=${email}`;

        forgotPassword(existingClient.email, link);

        return FormatData({
          message: `a link has been sent to your email -${email}`,
          link,
        });
      } else {
        throw new BadRequestError("user with the email does not exist", true);
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async CheckResetLink({ tokenstring }) {
    try {
      const token = await this.repository.FindTokenByUserTokenString({
        tokenstring,
      });

      if (token) {
        return FormatData({
          message: `valid`,
        });
      } else {
        throw new BadRequestError("link expired or invalid", true);
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async ResetPassword({ id, password, confirmPassword }) {
    try {
      const existingClient = await this.repository.FindExistingClientById({
        id,
      });
      const passwordMatch = await CheckPassword(password, confirmPassword);

      if (existingClient) {
        if (passwordMatch) {
          let hashedPassword = await GeneratePassword(
            password,
            existingClient.salt
          );

          await this.repository.UpdatePassword({
            id,
            password: hashedPassword,
          });

          return FormatData({
            message: "password changed successfully",
          });
        } else {
          throw new APIError(
            "API Error",
            STATUS_CODES.BAD_REQUEST,
            "password does not match"
          );
        }
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
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

export default ClientService;
