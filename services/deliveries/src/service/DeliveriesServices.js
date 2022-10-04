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

    async SubscribeEvents(payload) {
      const { event, data } = payload;
  
      const {Id, service ,serviceClass, location } = data;


  
      switch (event) {
        case "fetchTechnicians":
          this.requestTechnicians(Id, service ,serviceClass, location);

          
          break;
  
        default:
          break;
      }
    }


}


export default DeliveriesServices;
