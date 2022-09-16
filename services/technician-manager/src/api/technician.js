import TechnicianService from "../service/TechnicianServices.js";

export const technician = (app) => {
  const service = new TechnicianService(); 
//rating
//displaying of fetching
app.get("/rating", async (req, res, next) => {
  try {
    const {data} =service.Getrating()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/rating", async (req, res, next) => {
  try {
   const { ratingid,
    quality,
    cost,
    promptness,
    technicianid} = req.body
    const {data} =service.addrating()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("rating", async (req, res, next) => {
    try {
      const {
        ratingid,
      quality,
      cost,
      promptness,
      technicianid
      } = req.body;
      const { data } = await service.Updaterating({
        ratingid,
        quality,
        cost,
        promptness,
        technicianid
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

//service

//displaying of fetching
app.get("/service", async (req, res, next) => {
  try {
    const {data} =service.Getservice()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/service", async (req, res, next) => {
  try {
   const { jobytype,
   jobcategory,
   pricerange,
   serviceimage,
   technicianid} = req.body
    const {data} =service.addservice()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("service", async (req, res, next) => {
    try {
      const {
        jobytype,
   jobcategory,
   pricerange,
   serviceimage,
   technicianid
      } = req.body;
      const { data } = await service.Updateservice({
        jobytype,
   jobcategory,
   pricerange,
   serviceimage,
   technicianid
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //servicehistory

//displaying of fetching
app.get("/servicehistory", async (req, res, next) => {
  try {
    const {data} =service.Getservicehistory()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/servicehistory", async (req, res, next) => {
  try {
   const { technicianid,
   serviceid,
   rating,
   date,
   status} = req.body
    const {data} =service.addservicehistory()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("servicehistory", async (req, res, next) => {
    try {
      const {
        technicianid,
        serviceid,
        rating,
        date,
        status
      } = req.body;
      const { data } = await service.Updateservicehistory({
        technicianid,
        serviceid,
        rating,
        date,
        status
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });


    //staffedtechnicians

//displaying of fetching
app.get("/staffedtechnicians", async (req, res, next) => {
  try {
    const {data} =service.Getstaffedtechnicians()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/staffedtechnicians", async (req, res, next) => {
  try {
   const {  
    organisationid,
    jobcategory,
    staffid,
    deparment
       } = req.body
    const {data} =service.addstaffedtechnicians()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("staffedtechnicians", async (req, res, next) => {
    try {
      const {
        organisationid,
        jobcategory,
        staffid,
        deparment
               } = req.body;
      const { data } = await service.Updatestaffedtecnicians({
        organisationid,
        jobcategory,
        staffid,
        deparment 
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

    //technicians

//displaying of fetching
app.get("/technicians", async (req, res, next) => {
  try {
    const {data} =service.Gettechnicians()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/technicians", async (req, res, next) => {
  try {
   const {  
    name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,
        
        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
        
       } = req.body
    const {data} =service.addtechnicians(
      {
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,
        
        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
        
      }
    )
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("technicians", async (req, res, next) => {
    try {
      const {
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,
        
        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
        
               } = req.body;
      const { data } = await service.Updatetechnicians({
        name,
        phone,
        email,
        password,
        address,
        city,
        stat,
        zipCode,
        salt,
        
        technicianid,
        technciantype,
        credentialtype,
        credentialfile,
        status,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

   //training

//displaying of fetching
app.get("/training", async (req, res, next) => {
  try {
    const {data} =service.Gettraining()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/training", async (req, res, next) => {
  try {
   const {  
    organisationid,
    jobcategory,
    staffid,
    deparment
       } = req.body
    const {data} =service.addtraining()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("training", async (req, res, next) => {
    try {
      const {
        organisationid,
        jobcategory,
        staffid,
        deparment
               } = req.body;
      const { data } = await service.Updatetraining({
        organisationid,
        jobcategory,
        staffid,
        deparment 
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });


   //paymenthistory

//displaying of fetching
app.get("/paymenthistory", async (req, res, next) => {
  try {
    const {data} =paymenthistory.Getpaymenthistory()
 return res.status(201).json(data);

  } catch (err) {
    next(err);
  }
});
//creating or adding
app.post("/paymenthistory", async (req, res, next) => {
  try {
   const {  
    organisationid,
    jobcategory,
    staffid,
    deparment
       } = req.body
    const {data} =paymenthistory.addpaymenthistory()
    return res.status(201).json(data);
} catch (err) {
    next(err);
  }
});
//updating any of the properties 
  app.put("paymenthistory", async (req, res, next) => {
    try {
      const {
        organisationid,
        jobcategory,
        staffid,
        deparment
               } = req.body;
      const { data } = await service.Updatepaymenthistory({
        organisationid,
        jobcategory,
        staffid,
        deparment 
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });




};
