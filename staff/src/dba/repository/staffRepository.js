import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {staffModel} from "../models/staff.js";

//Dealing with database operations
class StaffServiceRepository {
  
 
  async CreateStaff( {
    firstname,
    lastname,
    email,
    address,
    state,
    dob,
    gender,
    position,
    employmentdate,
    profilepic,
    phonenumber,
    dpartment,
    roles,
     }) {
    try {
      const unit =  {  firstname,
        lastname,
        email,
        address,
        state,
        dob,
        gender,
        position,
        employmentdate,
        profilepic,
        phonenumber,
        dpartment,
        roles,
         };
      const newUnit = new staffModel(unit);
      newUnit.save();
      return newUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateStaff(   firstname,
    lastname,
    email,
    address,
    state,
    dob,
    gender,
    position,
    employmentdate,
    profilepic,
    phonenumber,
    dpartment,
    roles,
    id) {
    try {
      const filter = { _id:id };
      const update = {
        firstname,
        lastname,
        email,
        address,
        state,
        dob,
        gender,
        position,
        employmentdate,
        profilepic,
        phonenumber,
        dpartment,
        roles,
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
