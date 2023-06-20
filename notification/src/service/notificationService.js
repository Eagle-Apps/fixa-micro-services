// import NotificationServiceRepository from "../dba/repository/notificationServiceRepository.js";
import {
  verifyemail,
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
import { consumeMessage , createMessage} from "../utils/rabbitmq.js";

// All Business logic will be here
class NotificationService {
  constructor(channel) {
    // this.repository = new NotificationServiceRepository();
    this.channel = channel;
  }
  consumePayment= consumeMessage(this.channel, "payment_service", "NOTIFICATION_SERVICE");

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
    // console.log("payload-----", JSON.parse(payload));
    const { event, data } = payload;
    console.log(event);
    switch (event) {
      case "SIGN_UP_CLIENT":
        this.SignupSuccessMessage(payload);
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
      case "NOTIFY_TECHNICIAN":
        this.ServicenNotifyTechnician(data);
        break;

      default:
        break;
    }
  }
}

export default NotificationService;
