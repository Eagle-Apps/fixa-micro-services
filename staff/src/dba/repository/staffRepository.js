import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {staffModel} from "../models/staff.js";

//Dealing with database operations
class StaffServiceRepository {
  
 
  async CreateStaff( {
    Firstname,
        Lastname,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        Employment_date,
        Profile_pic,
        Phone_number,
        Dpartment,
        Roles,
     }) {
    try {
      const unit =  { Firstname,
        Lastname,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        Employment_date,
        Profile_pic,
        Phone_number,
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

  async UpdateStaff( Firstname,
    Lastname,
    Email,
    Address,
    State,
    DOB,
    Gender,
    Position,
    Employment_date,
    Profile_pic,
    Phone_number,
    Dpartment,
    Roles,
    id) {
    try {
      const filter = { _id:id };
      const update = {
        Firstname,
        Lastname,
        Email,
        Address,
        State,
        DOB,
        Gender,
        Position,
        Employment_date,
        Profile_pic,
        Phone_number,
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
