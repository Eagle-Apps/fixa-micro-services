import mongoose from "mongoose";

const billingSchema = mongoose.Schema({
  invoiceid: { type: String, required: true },
  item1particulars: { type: String, required: true },
  item1amount: { type: String, required: true },

  item2particulars: { type: String, required: true },
  item2amount: { type: String, required: true },

  item3particulars: { type: String, required: true },
  item3amount: { type: String, required: true },

  item4particulars: { type: String, required: true },
  item4amount: { type: String, required: true },
 
  item5particulars: { type: String, required: true },
  item5amount: { type: String, required: true },
  
  
  discount: { type: String, required: true },
  vat: { type: String, required: true },

  amount: { type: String, required: true },
  finalamount: { type: String, required: true },

  
  option: { type: String, required: true },
  status: { type: String, required: true }
});

export const billingModel = mongoose.model("billing", billingSchema);
