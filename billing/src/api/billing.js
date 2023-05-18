import BillingService from "../service/billingServices.js";

export const billing = (app) => {
  const service = new BillingService();

  app.post("/fixed", async (req, res, next) => {
    try{
      const{
        category,
        serviceName,
        standardPrice,
      }=req.body
        
      const data = await service.fixed({category,
        category,
        serviceName,
        standardPrice,});
    }catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.post("/addfixed", async (req, res, next) => {
    
    try{
      const{category,
        serviceName,
        standardPrice,
        classicPrice,
        premuimPrice,
        date}=req.body
      const data = await service.addfixed(category,
        serviceName,
        standardPrice,
        classicPrice,
        premuimPrice,
        date);
    }catch (err) {
      console.log(err);
      next(err);
    }
  });
  
 
  app.post("/ticket", async (req, res, next) => {
   

    try {
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
        status
      } = req.body;
    const { data } = await service.addticket({invoiceid,
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
      status
      
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});



  
  app.get("/ticket", async (req, res, next) => {
   
    try {
      const{
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
        status,
      } = req.body;
  
    const { data } = await service.Getticket({
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
      status


      
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});





  app.put("/ticket", async (req, res, next) => {
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
      status
    } = req.body;

    try {
    const { data } = await service.Updateticket({
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
      status
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});


};
