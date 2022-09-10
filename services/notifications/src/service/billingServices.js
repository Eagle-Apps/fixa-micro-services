import BillingRepository from "../dba/repository/notificationRepository.js";

import {
  APIError,
  BadRequestError,
  createBadRequestError,
  createAPIError,
  STATUS_CODES,
} from "../utils/app-errors.js";

// All Business logic will be here
class billingService {
  constructor() {
    this.repository = new BillingRepository();
  }


  async addticket(userInputs){
    const {
      invoiceid,
      item1particulars,
      item1amount,
      item2particulars,
      item2amount,
      item3particulars,
      item3amount,
      item4particulars,
      item4amount,
      item5particulars,
      item5amount,
      discount,
      vat,
      amount,
      finalamount, 
      option,
      status } = userInputs;
      try{
        const addticket = await this.repository.addticket({
          invoiceid,
          item1particulars,
          item1amount,
          item2particulars,
          item2amount,
          item3particulars,
          item3amount,
          item4particulars,
          item4amount,
          item5particulars,
          item5amount,
          discount,
          vat,
          amount,
          finalamount, 
          option,
          status });
      }
      catch(err){
      }
    }
    async Updateticket(userInputs){
      const {
        invoiceid,
        item1particulars,
        item1amount,
        item2particulars,
        item2amount,
        item3particulars,
        item3amount,
        item4particulars,
        item4amount,
        item5particulars,
        item5amount,
        discount,
        vat,
        amount,
        finalamount, 
        option,
        status} = userInputs;  
        try{
          const Updateticket = await this.repository.Updateticket({
            invoiceid,
            item1particulars,
            item1amount,
            item2particulars,
            item2amount,
            item3particulars,
            item3amount,
            item4particulars,
            item4amount,
            item5particulars,
            item5amount,
            discount,
            vat,
            amount,
            finalamount, 
            option,
            status  });  
        }
        catch(err){  
        }
      }
    async Getticket(){  
        try{
          const Getticket = await this.repository.Getticket()  
        }
        catch(err){
        }
      }
      
    // async Productfind(userInputs){
    //   const {
    //       brand,
    //       source,
    //       time_of_production,
    //       operating_conditions,
    //       state,
    //       min_lifespan,
    //       max_lifespan,
    //       average_lifespan,
    //       popular_use_regions,
    //       min_cost,
    //       max_cost,
    //       avg_cost,
    //       user_feedback,
    //       common_faults} = userInputs;
    
    
    //     try{
    //       const Productfind = await this.repository.Productfind({
    //         brand,
    //       source,
    //       time_of_production,
    //       operating_conditions,
    //       state,
    //       min_lifespan,
    //       max_lifespan,
    //       average_lifespan,
    //       popular_use_regions,
    //       min_cost,
    //       max_cost,
    //       avg_cost,
    //       user_feedback,
    //       common_faults
    //       });
    
    //     }
    //     catch(err){
    
    //     }
    //   }
  
  
}

export default billingService;
