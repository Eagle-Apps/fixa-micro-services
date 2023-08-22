import multer from 'multer'
import cloudinary from 'cloudinary'

import fs from 'fs'
import { APIError, BadRequestError, STATUS_CODES } from '../utils/app-errors.js'
// import jwt from "jsonwebtoken";
import { configs } from '../config/index.js'
const {
  APP_SECRET,
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
  FAULT_SERVICE,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  NOTIFICATION_SERVICE,
  CLIENT_SERVICE,
  PRODUCT_SERVICE,
} = configs

// handing images upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().getMilliseconds() + file.originalname)
  },
})

export const upload = multer({ storage: storage }).array('imageUrl', 5)
export const uploadTwo = multer({ storage: storage })

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

// cloudinary upload
export const UploadImage = (data) => {
  let mainFolderName = 'Chee-Multi-Vendor'
  console.log(data, 'from data')
  let filePathOnCloudinary = mainFolderName + '/' + data
  const uploadCheck = cloudinary.uploader
    .upload(data, {
      folder: 'chee-products',
    })
    .then((result) => {
      fs.unlinkSync(data)
      return {
        message: 'success',
        url: result.url,
      }
    })
    .catch((error) => {
      fs.unlinkSync(data)
      return { message: 'fail' }
    })
  // let latest = fs.createReadStream(file_name).pipe(stream);
  // console.log(latest, "latest upload complete");
  return uploadCheck
}

export const ValidateSignature = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
    req.user = payload
    return true
  }

  return false
}

export const FormatData = (data) => {
  console.log('-----here_---', data)
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}
