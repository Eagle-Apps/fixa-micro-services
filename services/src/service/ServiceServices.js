import ServiceRepository from "../dba/repository/serviceRepository.js";



class ServicesService {
  constructor() {
    this.repository = new ServiceRepository();

  }

  async CreateProduct(userInputs){
  const {
    name,
    image,
    icon,
    price,
    categories} = userInputs;


    try{
      const CreateProducts = await this.repository.Createproduct({
        name,
        image,
        icon,
        price,
        categories});
        return CreateProducts;

    }
    catch(err){

    }
  }

  async Updateproduct(userInputs){
    const {
      name,
      image,
      icon,
      price,
      categories} = userInputs;
  
  
      try{
        const UpdateProducts = await this.repository.Updateproduct({
          name,
          image,
          icon,
          price,
          categories
        });
  
      }
      catch(err){
  
      }
    }


  async Getproduct(){
  
      try{
        const GetProducts = await this.repository.Getproduct()
   return GetProducts;
      }
      catch(err){
  
      }
    }
    
  async Productfind(userInputs){
    const {
      name,
      image,
      icon,
      price,
      categories} = userInputs;
  
  
      try{
        const Productfind = await this.repository.Productfind({
          name,
          image,
          icon,
          price,
          categories
        });
  
      }
      catch(err){
  
      }
    }
  }
export default ServicesService;
