import mongoose from "mongoose";

const billingSchema = mongoose.Schema({
  invoiceid: { type: String},
  item1particulars: { type: String},
  item1amount: { type: String},

  item2particulars: { type: String},
  item2amount: { type: String},

  item3particulars: { type: String},
  item3amount: { type: String},

  item4particulars: { type: String},
  item4amount: { type: String},
 
  item5particulars: { type: String},
  item5amount: { type: String},
  
  
  discount: { type: String},
  vat: { type: String},

  amount: { type: String},
  finalamount: { type: String},

  
  option: { type: String},
  status: { type: String}
});

export const billingModel = mongoose.model("billing", billingSchema);
