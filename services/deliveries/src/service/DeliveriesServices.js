import DeliveriesRepository from "../dba/repository/deliveriesRepository.js";

import {
  FormatData,
  CheckPassword,
  HashPassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  CreateVerificationString
} from "../utils/index.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import { configs } from "../config/index.js";
const { SITE_DOMAIN } = configs;



class DeliveriesServices {
  constructor() {
    this.repository = new DeliveriesRepository();

  }

  

async addDeliveries(userInputs){
  const {
    description,
    payer,
    price,
    dispatcher,
    time,
    location,
     } = userInputs;
    try{
      const addDeliveries = await this.repository.addDeliveries({
        description,
    payer,
    price,
    dispatcher,
    time,
    location,
      });
    }
    catch(err){
    }
  }


  async updateDeliveries(userInputs){
    const {
      description,
      payer,
      price,
      dispatcher,
      time,
      location,} = userInputs;  
      try{
        const updateDeliveries = await this.repository.updateDeliveries({
          description,
          payer,
          price,
          dispatcher,
          time,
          location,
        });  
      }
      catch(err){ 
        return err;
      }
    }

  async getDeliveries(){  
      try{
        const getDeliveries = await this.repository.getDeliveries()  
      }
      catch(err){  
         return err;
      }
    }
    

  

}


export default DeliveriesServices;
