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
    categories,
    description} = userInputs;


    try{
      const CreateProducts = await this.repository.Createproduct({
        name,
        image,
        icon,
        price,
        categories,
        description});
        return CreateProducts;

    }
    catch(err){

    }
  }

  async Updateproduct({userInputs}){
    const{name,
      image,
      icon,
      price,
      categories,
      description,
      _id} = userInputs;
      try{
        const UpdateProducts =  this.repository.Updateproduct({name,
          image,
          icon,
          price,
          categories,
          description,
          _id});
        console.log(UpdateProducts);
      return UpdateProducts;
      }
      catch(err){
  
      }
    }


  async Getproduct(){
  
      try{
       const data =await this.repository.Getproductr();
        return data;
      }
      catch(err){
  
      }
    }
    
  async Productfind(data){
  
      try{
        const Productfind = await this.repository.Productfind(data);
  return Productfind;
      }
      catch(err){
  
      }
    }
  }
export default ServicesService;
