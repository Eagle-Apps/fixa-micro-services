import TechnicianRepository from "../dba/repository/technicianRepository.js";

import {
  FormatData,
  CheckPassword,
  HashPassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  CreateVerificationString,
} from "../utils/index.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import { configs } from "../config/index.js";
const { SITE_DOMAIN } = configs;

class TechnicianService {
  constructor() {
    this.repository = new TechnicianRepository();
  }

  async Updaterating(userInputs) {
    const { id, quality, promptness } = userInputs;
    const oldRating = this.getRatingById(id);

    try {
      const Updaterating = await this.repository.Updaterating({
        ratingid,
        quality,
        cost,
        promptness,
        technicianid,
      });
    } catch (err) {}
  }

  async getRatingById() {
    try {
      const Getrating = await this.repository.Getrating();
    } catch (err) {}
  }
  async Getrating() {
    try {
      const Getrating = await this.repository.Getrating();
    } catch (err) {}
  }

  //Services
  async addservice(userInputs) {
    const { jobytype, jobcategory, pricerange, serviceimage, technicianid } =
      userInputs;
    try {
      const addservice = await this.repository.addservice({
        jobytype,
        jobcategory,
        pricerange,
        serviceimage,
        technicianid,
      });
      res.json(msg)
    } catch (err) {}
  }

  async Updateservice(userInputs) {
    const { jobytype, jobcategory, pricerange, serviceimage, technicianid } =
      userInputs;

    try {
      const Updateservice = await this.repository.Updateservice({
        jobytype,
        jobcategory,
        pricerange,
        serviceimage,
        technicianid,
      });
    } catch (err) {}
  }

  async Getservice() {
    try {
      const Getservice = await this.repository.Getservice();
    } catch (err) {}
  }

  //Servicehistory

  async addservicehistory(userInputs) {
    const { technicianid, serviceid, rating, date, status } = userInputs;
    try {
      const addservicehistory = await this.repository.addservicehistory({
        technicianid,
        serviceid,
        rating,
        date,
        status,
      });
    } catch (err) {}
  }
  async Updateservicehistory(userInputs) {
    const { technicianid, serviceid, rating, date, status } = userInputs;
    try {
      const Updateservicehistory = await this.repository.Updateservicehistory({
        technicianid,
        serviceid,
        rating,
        date,
        status,
      });
    } catch (err) {}
  }
  async Getservicehistory() {
    try {
      const Getservicehistory = await this.repository.Getservicehistory();
    } catch (err) {}
  }

  // technicians
  async getAlldataById(id) {
    try {
    } catch (err) {}
  }

  async SignUp({name,
    email,
    password,
    confirmPassword,
    phone,
    address,
    city,
    state,
    zipCode,
  },res) {
    try {
      //check if user is already registered
      const existingClient = await this.repository.FindExistingClient(
        email,
        "email"
      );

      const passwordMatch = await CheckPassword(password, confirmPassword);

      if (!existingClient) {
        if (passwordMatch) {
          let salt = await GenerateSalt();

          let hashedPassword = await HashPassword(password, salt);
          let verificationString = await CreateVerificationString();

          const createdClient = await this.repository.CreateClient({name,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            state,
            zipCode,
            salt,
            verificationString,
          });

          // const token = await GenerateSignature({
          //   email: email,
          //   _id: createdClient._id,
          // });

          // const link = `${SITE_DOMAIN}/verifyemail/?token=${createdClient.verificationString}`;

          // FormatData({
          //   id: createdClient._id,
          //   email: createdClient.email,
          //   token,
          //   link,
          // });

          return createdClient;
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






  async SendEmailVerifcation({ id }) {
    try {
      const existingClient = await this.repository.FindExistingClient(id, "id");

      const link = `${SITE_DOMAIN}/verifyemail/?token=${existingClient.verificationString}`;

      return FormatData({ email: existingClient.email, link });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async VerifyEmail({ token }) {
    try {
      const tokenExist = await this.repository.FindExistingClient(
        token,
        "verification_code"
      );
      if (tokenExist) {
        await this.VerifyEmail(token);
      } else {
        throw new BadRequestError("invalid token", true);
      }

      return FormatData({ email: token.email });
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
      const existingClient = await this.repository.FindExistingClient(
        email,
        "email"
      );

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

  async UpdateClientProfile(userInputs) {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      userId,
    } = userInputs;

    try {
      const updatedProfile = await this.repository.UpdateClientProfile({
        name: `${lastName} ${firstName}`,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        userId,
      });

      return FormatData({ updatedProfile, message: "update successful" });
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
      const existingClient = await this.repository.FindExistingClient(
        email,
        "email"
      );

      if (existingClient) {
        const token = await this.repository.FindTokenByUserId({
          user: existingClient,
        });

        const link = `${SITE_DOMAIN}/passwordreset/?token=${token.resetPasswordToken}&id=${existingClient._id}&email=${email}`;

        const data = { link, email };

        return FormatData({
          message: `a link has been sent to your email -${email}`,
          data,
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

  async GetProfile({ id }) {
    try {
      const profile = await this.repository.GetClientProfile({
        id,
      });

      return FormatData({
        profile,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetAllClients({ id }) {
    try {
      const clients = await this.repository.GetClients();
      return FormatData({
        clients,
      });
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
      const existingClient = await this.repository.FindExistingClient(id, "id");
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

  async addtechnicians(userInputs) {
    const {
      name,
      phone,
      email,
      password,
      address,
      city,
      stat,
      zipCode,
      salt,

      technicianid,
      technciantype,
      credentialtype,
      credentialfile,
      status,
    } = userInputs;
    try {
      const addtechnicians = await this.repository.addtechnicians({
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
    } catch (err) {}
  }
  async Updatetechnicians(userInputs) {
    const {
      name,
      phone,
      email,
      password,
      address,
      city,
      stat,
      zipCode,
      salt,

      technicianid,
      technciantype,
      credentialtype,
      credentialfile,
      status,
    } = userInputs;
    try {
      const Updatetechnicians = await this.repository.Updatetechnicians({
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,

        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
    } catch (err) {
      return err;
    }
  }
  async Gettechnicians() {
    try {
      const Gettechnicians = await this.repository.Gettechnicians();
    } catch (err) {
      return err;
    }
  }

  // training

  async addtraining(userInputs) {
    const { organisationid, jobcategory, staffid, deparment } = userInputs;
    try {
      const addtraining = await this.repository.addtraining({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
    } catch (err) {}
  }
  async Updatetraining(userInputs) {
    const { organisationid, jobcategory, staffid, deparment } = userInputs;
    try {
      const Updatetraining = await this.repository.Updatetraining({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
    } catch (err) {}
  }
  async Gettraining() {
    try {
      const Gettraining = await this.repository.Gettraining();
    } catch (err) {}
  }

  // paymenthistory

  async addpaymenthistory(userInputs) {
    const { organisationid, jobcategory, staffid, deparment } = userInputs;
    try {
      const addpaymenthistory = await this.repository.addpaymenthistory({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
    } catch (err) {}
  }
  async Updatepaymenthistory(userInputs) {
    const { organisationid, jobcategory, staffid, deparment } = userInputs;
    try {
      const Updatepaymenthistory = await this.repository.Updatepaymenthistory({
        organisationid,
        jobcategory,
        staffid,
        deparment,
      });
    } catch (err) {}
  }
  async Getpaymenthistory() {
    try {
      const Getpaymenthistory = await this.repository.Getpaymenthistory();
    } catch (err) {}
  }

  async requestTechnicians(Id, service, serviceClass, location) {
    const { long, lat } = location;

    try {
      const technician = await this.repository.findtechnician(
        Id,
        service,
        serviceClass,
        long,
        lat
      );
      // const serviceClass = await this.repository.serviceClass(serviceClass);
    } catch (err) {}
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { Id, service, serviceClass, location } = data;

    switch (event) {
      case "fetchTechnicians":
        this.requestTechnicians(Id, service, serviceClass, location);

        break;

      default:
        break;
    }
  }
}

export default TechnicianService;
