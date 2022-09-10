import TechnicianRepository from "../dba/repository/technicianRepository.js";



class TechnicianService {
  constructor() {
    this.repository = new TechnicianRepository();

  }

  async addrating(userInputs){
  const {
    ratingid,
    quality,
    cost,
    promptness,
    technicianid} = userInputs;
    try{
      const addrating = await this.repository.addrating({
        ratingid,
        quality,
        cost,
        promptness,
        technicianid
      });

    }
    catch(err){

    }
  }

  async Updaterating(userInputs){
    const {
      ratingid,
      quality,
      cost,
      promptness,
      technicianid} = userInputs;
  
  
      try{
        const Updaterating = await this.repository.Updaterating({
          ratingid,
    quality,
    cost,
    promptness,
    technicianid
        });
  
      }
      catch(err){
  
      }
    }


  async Getrating(){
  
      try{
        const Getrating = await this.repository.Getrating()
  
      }
      catch(err){
  
      }
    }
    
//Services
  async addservice(userInputs){
    const {
      jobytype,
      jobcategory,
      pricerange,
      serviceimage,
      technicianid } = userInputs;
      try{
        const addservice = await this.repository.addservice({
          jobytype,
      jobcategory,
      pricerange,
      serviceimage,
      technicianid
        });
  
      }
      catch(err){
  
      }
    }
  
    async Updateservice(userInputs){
      const {
        jobytype,
        jobcategory,
        pricerange,
        serviceimage,
        technicianid} = userInputs;
    
    
        try{
          const Updateservice = await this.repository.Updateservice({
            jobytype,
      jobcategory,
      pricerange,
      serviceimage,
      technicianid
          });
    
        }
        catch(err){
    
        }
      }
  
  
    async Getservice(){
    
        try{
          const Getservice = await this.repository.Getservice()
    
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
  
//Servicehistory
  

async addservicehistory(userInputs){
  const {
    technicianid,
   serviceid,
   rating,
   date,
   status } = userInputs;
    try{
      const addservicehistory = await this.repository.addservicehistory({
        technicianid,
        serviceid,
        rating,
        date,
        status
      });
    }
    catch(err){
    }
  }
  async Updateservicehistory(userInputs){
    const {
      technicianid,
      serviceid,
      rating,
      date,
      status} = userInputs;  
      try{
        const Updateservicehistory = await this.repository.Updateservicehistory({
          technicianid,
   serviceid,
   rating,
   date,
   status
        });  
      }
      catch(err){  
      }
    }
  async Getservicehistory(){  
      try{
        const Getservicehistory = await this.repository.Getservicehistory()  
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

  

//Staffed technicians
  

async addstaffedtechnicians(userInputs){
  const {
    organisationid,
    jobcategory,
    staffid,
    deparment
     } = userInputs;
    try{
      const addstaffedtechnicians = await this.repository.addstaffedtechnicians({
        organisationid,
    jobcategory,
    staffid,
    deparment
      });
    }
    catch(err){
    }
  }
  async Updatestaffedtechnicians(userInputs){
    const {
      organisationid,
      jobcategory,
      staffid,
      deparment} = userInputs;  
      try{
        const Updatestaffedtechnicians = await this.repository.Updatestaffedtechnicians({
          organisationid,
    jobcategory,
    staffid,
    deparment
        });  
      }
      catch(err){  
      }
    }
  async Getstaffedtechnicians(){  
      try{
        const Getstaffedtechnicians = await this.repository.Getservicehistory()  
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

// technicians
  

async addtechnicians(userInputs){
  const {
    organisationid,
    jobcategory,
    staffid,
    deparment
     } = userInputs;
    try{
      const addtechnicians = await this.repository.addtechnicians({
        organisationid,
    jobcategory,
    staffid,
    deparment
      });
    }
    catch(err){
    }
  }
  async Updatetechnicians(userInputs){
    const {
      organisationid,
      jobcategory,
      staffid,
      deparment} = userInputs;  
      try{
        const Updatetechnicians = await this.repository.Updatetechnicians({
          organisationid,
    jobcategory,
    staffid,
    deparment
        });  
      }
      catch(err){  
      }
    }
  async Gettechnicians(){  
      try{
        const Gettechnicians = await this.repository.Gettechnicians()  
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



// training
  

async addtraining(userInputs){
  const {
    organisationid,
    jobcategory,
    staffid,
    deparment
     } = userInputs;
    try{
      const addtraining = await this.repository.addtraining({
        organisationid,
    jobcategory,
    staffid,
    deparment
      });
    }
    catch(err){
    }
  }
  async Updatetraining(userInputs){
    const {
      organisationid,
      jobcategory,
      staffid,
      deparment} = userInputs;  
      try{
        const Updatetraining = await this.repository.Updatetraining({
          organisationid,
    jobcategory,
    staffid,
    deparment
        });  
      }
      catch(err){  
      }
    }
  async Gettraining(){  
      try{
        const Gettraining = await this.repository.Gettraining()  
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


// paymenthistory
  

async addpaymenthistory(userInputs){
  const {
    organisationid,
    jobcategory,
    staffid,
    deparment
     } = userInputs;
    try{
      const addpaymenthistory = await this.repository.addpaymenthistory({
        organisationid,
    jobcategory,
    staffid,
    deparment
      });
    }
    catch(err){
    }
  }
  async Updatepaymenthistory(userInputs){
    const {
      organisationid,
      jobcategory,
      staffid,
      deparment} = userInputs;  
      try{
        const Updatepaymenthistory = await this.repository.Updatepaymenthistory({
          organisationid,
    jobcategory,
    staffid,
    deparment
        });  
      }
      catch(err){  
      }
    }
  async Getpaymenthistory(){  
      try{
        const Getpaymenthistory = await this.repository.Getpaymenthistory()  
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


export default TechnicianService;
