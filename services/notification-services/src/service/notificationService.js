// import NotificationServiceRepository from "../dba/repository/notificationServiceRepository.js";
import { verifyemail } from "../../../client-manager/src/mail/mailgun.js";
import {
  forgotPassword,
  requestService,
  signupSuccess,
} from "../mail/mailgun.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";

// All Business logic will be here
class NotificationService {
  constructor() {
    // this.repository = new NotificationServiceRepository();
  }

  async SignupSuccessMessage({ name, email, password }) {
    try {
      //email notification
      signupSuccess(name, email, password);

      //sms notification

      //push notification
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async VerifyEmailAccount({ email, link }) {
    try {
      //email notification
      verifyemail(email, link);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async VerifyEmailsuccess({ email, link }) {
    try {
      //email notification
      verifyemail(email, link);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async ForgetPasswordNotifcation({ email, link }) {
    try {
      //email notification
      forgotPassword(email, link);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async ServiceRequestNotification({ email, details }) {
    try {
      //email notification
      requestService(email, details);
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

    switch (event) {
      case "SIGN_UP":
        this.SignupSuccessMessage(data);
        break;
      case "VERIFY_EMAIL":
        this.VerifyEmailAccount(data);
        break;

      case "EMAIL_VERIFICATION_SUCCESS":
        this.VerifyEmailsuccess(data);
        break;
      case "PASSWORD_RESET":
        this.ForgetPasswordNotifcation(data);
        break;
      case "REQUEST_SERVICE":
        this.ServiceRequestNotification(data);
        break;

      default:
        break;
    }
  }
}

export default NotificationService;
