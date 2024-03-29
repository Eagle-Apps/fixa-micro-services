import { billingModel } from '../models/billing.js'
import { fixedModel } from '../models/fixed.js'

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'

//Dealing with database operations
class BillingRepository {
  async fixed({ category, serviceName, sClass, sName }) {
    try {
      if (serviceClass == 'standard') {
        const requestfixedbill = await fixedModel.find({
          $or: [
            { category: { $regex: category, $options: 'i' } },
            { standardPrice: { $regex: sClass, $options: 'i' } },
            { serviceName: { $regex: serviceName, $options: 'i' } },
          ],
        })
      }
      if (serviceClass == 'clasic') {
        const requestfixedbill = await fixedModel.find({
          $or: [
            { category: { $regex: category, $options: 'i' } },
            { classicPrice: { $regex: sClass, $options: 'i' } },
            { serviceName: { $regex: serviceName, $options: 'i' } },
          ],
        })
      }
      if (serviceClass == 'premuim') {
        const requestfixedbill = await fixedModel.find({
          $or: [
            { category: { $regex: category, $options: 'i' } },
            { premuimPrice: { $regex: sClass, $options: 'i' } },
            { serviceName: { $regex: serviceName, $options: 'i' } },
          ],
        })
      }
      if (serviceClass == 'all') {
        const requestfixedbill = await fixedModel.find({
          $or: [
            { category: { $regex: category, $options: 'i' } },
            { premuimPrice: { $regex: sClass, $options: 'i' } },
            { serviceName: { $regex: serviceName, $options: 'i' } },
          ],
        })
      }

      return requestfixedbill
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      )
    }
  }

  //add fixed prices
  async addfixed(
    {
      category,
      serviceName,
      standardPrice,
      classicPrice,
      premuimPrice,
      date,
    } = req.body
  ) {
    try {
      const billing = new fixedModel({
        category,
        serviceName,
        standardPrice,
        classicPrice,
        premuimPrice,
        date,
      })
      const Result = await fixedModel.save()
      return Result
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Create Client'
      )
    }
  }

  //add ticket
  async addticket({
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
  }) {
    try {
      const billing = new billingModel({
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
      const Result = await billing.save()
      return Result
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      )
    }
  }

  //update
  async Updateticket( userInputs ) {
    // console.log('Updateticket', userInputs)
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
      // console.log('UserInputs from Repo', userInputs)
      const update = {
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
      }
      const ticket = billingModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
        context: 'query',
      })

      return ticket
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      )
    }
  }

  //to display

  async Getticket() {
    // try {
    //   const getDatas = billingModel.find()
    //   // console.log(getDatas, 'from get datas')
    //   billingModel.find({ data }, (err, products) => {
    //     if (err) {
    //       return res.send(err)
    //     }
    //     return res.json(products)
    //   })
    // } catch (err) {
    //   throw new APIError(
    //     'API Error',
    //     STATUS_CODES.INTERNAL_ERROR,
    //     `Unable to Update product ${err.message}`
    //   )
    // }
    try {
      const ticket = await billingModel.find()
      return ticket
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }
}

export default BillingRepository
