import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {staffModel} from "../models/staff.js";

//Dealing with database operations
class StaffServiceRepository {
  
 
  async CreateStaff( {
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
      const unit =  {FirstName,
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
         };
      const newUnit = new staffModel(unit);
      newUnit.save();
      return newUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateStaff( FirstName,
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
    id) {
    try {
      const filter = { _id:id };
      const update = {
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
      };
      const updatedUnit = await staffModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return updatedUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FetchStaff(id) {
    try {
      const unit = staffModel.findById(id);
      return unit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

async FetchallStaff() {
  try {
    const unit = await staffModel.find();
    return unit;
  } catch (err) {
    throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  }
}
}

export default StaffServiceRepository;
