import StaffServiceRepository from "../dba/repository/staffRepository.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import {
  FormatData
} from "../utils/index.js";
// All Business logic will be here
class StaffService {
  constructor() {
    this.repository = new StaffServiceRepository();
  }
  
  async CreateStaff({
    FirstName,
    LastName,
    Email,
    Address,
    State,
    DOB,
    Gender,
    Position,
    EmploymentDate,
    ProfilePic,
    PhoneNumber,
    Dpartment,
    Roles,
    }) {
    try {
      const unit = await this.repository.CreateStaff({
        FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
      Dpartment,
      Roles,
        });

      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateStaff(
    FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
      Dpartment,
      Roles,
    id
    ) {
    try {
      const unit = await this.repository.UpdateStaff(
        FirstName,
      LastName,
      Email,
      Address,
      State,
      DOB,
      Gender,
      Position,
      EmploymentDate,
      ProfilePic,
      PhoneNumber,
      Dpartment,
      Roles,
        id
      );

      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetStaff(id) {
    try {
      const unit = await this.repository.FetchStaff(id);
      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  
  async GetallStaff() {
    try {
      const unit = await this.repository.FetchallStaff();
      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async CreatePayload(event, data, clientId) {
    try {
      let payload;

      switch (event) {
        case "NEW_UNIT":
          payload = {
            event,
            data: { unitId: data._id, clientId },
          };

        default:
          break;
      }
      return payload;
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

      default:
        break;
    }
  }
}

export default StaffService;
