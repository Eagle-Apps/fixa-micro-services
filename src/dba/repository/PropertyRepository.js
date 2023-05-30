import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {propertyModel} from "../models/unit.js";

//Dealing with database operations
class PropertyServiceRepository {
  
 
  async CreateProperty( {typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,

     }) {
    try {
      const property =  {typebuilding,
        address,
        sizebuilding,
        occupants,
        ownerName,
    
        manageName,
        managePhone,
        manageAddress,
         };
      const newProperty = new propertyModel(property);
      newProperty.save();
      return newProperty;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateProperty({typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
    id}) {
    try {
      const filter = { _id:id };
      // console.log("red", id)
      const update = {
        typebuilding,
        address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
      };
      const updatedProperty = await propertyModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return updatedProperty;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FetchProperty(id) {
    try {
      const property = propertyModel.findById(id);
      return property;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

async FetchallProperty() {
  try {
    const property = await propertyModel.find();
    return property;
  } catch (err) {
    throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  }
}
}

export default PropertyServiceRepository;
