import BillingRepository from '../dba/repository/billingRepository.js'

import { APIError, BadRequestError, STATUS_CODES } from '../utils/app-errors.js'

// All Business logic will be here
class billingService {
  constructor() {
    this.repository = new BillingRepository()
  }

  async fixed(userInputs) {
    const { category, serviceName, serviceClass } = userInputs
    try {
      const addticket = await this.repository.fixed({
        category,
        serviceName,
        serviceClass,
      })
    } catch (err) {}
  }

  async addfixed(userInputs) {
    const {
      category,
      serviceName,
      standardPrice,
      classicPrice,
      premuimPrice,
      date,
    } = userInputs
    try {
      const addticket = await this.repository.addfixed({
        category,
        serviceName,
        standardPrice,
        classicPrice,
        premuimPrice,
        date,
      })
    } catch (err) {}
  }

  async addticket(userInputs) {
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
      // amount,
      finalamount,
      option,
      status,
    } = userInputs
    try {
      const vatRate = 7.5

      const totalAmount =
        +item1amount + +item2amount + +item3amount + +item4amount + +item5amount

      // Calculate the discounted amount
      const discountedAmount = totalAmount * (+discount / 100)

      // Calculate the VAT amount
      const vatAmount = totalAmount * (vatRate / 100)

      // Calculate the final amount
      const finalAmount = totalAmount - (discountedAmount + vatAmount)

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
        vat: vatRate,
        amount: totalAmount.toLocaleString(),
        finalamount: finalAmount.toLocaleString(),
        option,
        status,
      })
      return addticket
    } catch (err) {}
  }
  async Updateticket(userInputs) {
    const {
      id,
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
    } = userInputs
    try {
      // console.log('UserInputs: ', userInputs)
      const Updateticket = await this.repository.Updateticket({
        id,
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
      })
      console.log('UPdate Ticket', Updateticket )
      return Updateticket
    } catch (err) {}
  }
  async Getticket() {
    try {
      const Getticket = await this.repository.Getticket()

      return Getticket
    } catch (err) {}
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

export default billingService
