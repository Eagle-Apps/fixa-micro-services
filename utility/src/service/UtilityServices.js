import UtilityRepository from "../dba/repository/utilityRepository.js";



class UtilityService {
  constructor() {
    this.repository = new UtilityRepository();

  }

  async CreateProduct(userInputs){
  const {
      brand,
      source,
      time_of_production,
      operating_conditions,
      state,
      min_lifespan,
      max_lifespan,
      average_lifespan,
      popular_use_regions,
      min_cost,
      max_cost,
      avg_cost,
      user_feedback,
      common_faults} = userInputs;


    try{
      const CreateProducts = await this.repository.Createproduct({
        brand,
      source,
      time_of_production,
      operating_conditions,
      state,
      min_lifespan,
      max_lifespan,
      average_lifespan,
      popular_use_regions,
      min_cost,
      max_cost,
      avg_cost,
      user_feedback,
      common_faults
      });

    }
    catch(err){

    }
  }

  async Updateproduct(userInputs){
    const {
        brand,
        source,
        time_of_production,
        operating_conditions,
        state,
        min_lifespan,
        max_lifespan,
        average_lifespan,
        popular_use_regions,
        min_cost,
        max_cost,
        avg_cost,
        user_feedback,
        common_faults} = userInputs;
  
  
      try{
        const UpdateProducts = await this.repository.Updateproduct({
          brand,
        source,
        time_of_production,
        operating_conditions,
        state,
        min_lifespan,
        max_lifespan,
        average_lifespan,
        popular_use_regions,
        min_cost,
        max_cost,
        avg_cost,
        user_feedback,
        common_faults
        });
  
      }
      catch(err){
  
      }
    }


  async Getproduct(){
  
      try{
        const GetProducts = await this.repository.Getproduct()
  
      }
      catch(err){
  
      }
    }
    
  async Productfind(userInputs){
    const {
        brand,
        source,
        time_of_production,
        operating_conditions,
        state,
        min_lifespan,
        max_lifespan,
        average_lifespan,
        popular_use_regions,
        min_cost,
        max_cost,
        avg_cost,
        user_feedback,
        common_faults} = userInputs;
  
  
      try{
        const Productfind = await this.repository.Productfind({
          brand,
        source,
        time_of_production,
        operating_conditions,
        state,
        min_lifespan,
        max_lifespan,
        average_lifespan,
        popular_use_regions,
        min_cost,
        max_cost,
        avg_cost,
        user_feedback,
        common_faults
        });
  
      }
      catch(err){
  
      }
    }
  }
export default UtilityService;
