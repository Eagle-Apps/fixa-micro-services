import ServiceService from '../service/ServiceServices.js'
// import CategoryService from '../service/category.js'

import {
  ValidateSignature,
  upload,
  UploadImage,
  uploadTwo,
} from '../utils/file-handler.js'
import { consumeMessage } from '../utils/rabbitmq.js'

export const service = (app) => {
  const service = new ServiceService()
  // const service = new CategoryService()

  app.get('/', async (req, res, next) => {
    try {
      res.send({ serviceSays: 'everything soft here' })
    } catch (err) {
      next(err)
    }
  })
  //displaying all the cartegories
  app.get('/categories', async (req, res, next) => {
    try {
      const data = await service.Getcategories()

      return res.send(data)
    } catch (err) {
      next(err)
    }
  })

  //creating or adding a new category
  // app.post('/categories/add', async (req, res, next) => {
  //   try {
  //     const { categories } = req.body

  //     const data = await service.Createcategories(categories)
  //     console.log(data)

  //     return res.status(201).send({ data })
  //   } catch (err) {
  //     next(err)
  //   }
  // })

  // creating category
  app.post('/category', async (req, res, next) => {
    try {
      const { name, subCategory } = req.body
      const createCategory = await service.CreateCategory({
        name,
        subCategory,
      })
      res.status(200).json({ msg: 'created category', createCategory })
    } catch (err) {
      next(err)
    }
  })

  // update category
  app.patch('/update-category/:id', async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const { name, subCategory, isActive } = req.body
      const updateCategory = await service.updateCategory({
        name,
        subCategory,
        isActive,
        categoryId,
      })
      res.status(200).json({ msg: 'updated category', updateCategory })
    } catch (err) {
      next(err)
    }
  })

  // get category by id
  app.get('/get-category/:id', async (req, res, next) => {
    try {
      const categoryId = req.params.id
      // const { name, subCategory, isActive } = req.body;
      const updateCategory = await service.GetACategory({
        categoryId,
      })
      res.status(200).json({ msg: 'category', updateCategory })
    } catch (err) {
      next(err)
    }
  })

  // update category active state
  app.patch('/category-active/:id', async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const { isActive } = req.body
      const updateCategory = await service.UpdateCategoryActiveState({
        categoryId,
        isActive,
      })
      res.status(200).json({ msg: 'updated category', updateCategory })
    } catch (err) {
      next(err)
    }
  })

  // delete category
  app.delete('/delete-category/:id', async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const updateCategory = await service.DeleteCategory(categoryId)
      res
        .status(200)
        .json({ msg: 'category deleted successfully', updateCategory })
    } catch (err) {
      next(err)
    }
  })

  // get categories
  app.get('/category', async (req, res) => {
    try {
      const categories = await service.GetCategories()
      console.log(categories)
      return res.status(200).json(categories)
    } catch (err) {
      console.log(err.msg)
    }
  })

  // get active categories
  app.get('/active-categories', async (req, res) => {
    try {
      const categories = await service.GetActiveCategories()
      console.log(categories)
      return res.status(200).json(categories)
    } catch (err) {
      console.log(err.msg)
    }
  })

  //creating or adding a new sub category
  app.post('/subcategories/add', async (req, res, next) => {
    try {
      const { subcategories } = req.body

      const data = await service.Createsubcategories(subcategories)
      console.log(data)

      return res.status(201).send({ data })
    } catch (err) {
      next(err)
    }
  })

  //displaying details of a particular product using it's unique id
  app.get('/products/:productId', async (req, res, next) => {
    try {
      const query = {}
      if (req.query.status) {
        query.status = req.query
      }
      const data = await service.Productfind(req.params.productId)

      return res.status(200).send(data)
    } catch (err) {
      next(err)
    }
  })

  //displaying all the products
  app.get('/products', async (req, res, next) => {
    try {
      const data = await service.Getproduct()

      return res.status(200).send(data)
    } catch (err) {
      next(err)
    }
  })

  //creating or adding a new product
  // app.post('/products/add', async (req, res, next) => {
  //   upload(req, res, async (err) => {
  //     if (err) {
  //       return res.json({ msg: 'File Missing ' })
  //     } else if (req.files === undefined) {
  //       return res.status(500).json({ msg: 'File Missing...' })
  //     } else {
  //       if (req.files) {
  //         const reqfiles = []
  //         for (let i = 0; i < req.files.length; i++) {
  //           var localFilePath = req.files[i].path
  //           var result = await UploadImage(localFilePath)
  //           reqfiles.push(result.url)
  //         }
  //         req.body.imageUrl = reqfiles
  //         try {
  //           // const {
  //           //   name,
  //           //   image,
  //           //   icon,
  //           //   price,
  //           //   categories,
  //           //   description
  //           // } = req.body;

  //           const data = await service.CreateProduct({
  //             ...req.body,
  //           })
  //           console.log(data)

  //           return res.status(201).send({ data })
  //         } catch (err) {
  //           next(err)
  //         }
  //       }
  //     }
  //   })
  // })

  //creating services
  app.post('/product/add', uploadTwo.array('images', 1), async (req, res) => {
    console.log('before try upload')
    // let productOwner = await req.user._id
    if (req.files) {
      console.log(req.files, 'from files ')
      const reqfiles = []
      for (let i = 0; i < req.files.length; i++) {
        var localFilePath = req.files[i].path
        console.log(localFilePath, 'from file path')
        var result = await UploadImage(localFilePath)
        reqfiles.push(result.url)
      }
      req.body.images = reqfiles
      // const { icon } = req.body
      // console.log('ICON', icon)
      // console.log(reqfiles);
      // console.log(productOwner)
      try {
        console.log(req.body.images[0], 'request image')
        console.log(req.body, 'request image body')
        const product = await service.CreateProduct({
          ...req.body,
          imageUrl: req.body.images[0],
        })
        // console.log(product, "products");
        return res.status(200).json({
          message: 'product created successfully',
          product: product,
        })
      } catch (err) {
        console.log(err.msg)
      }
    }
  })

  //updating any of the properties of a particular product
  app.put('/products/update/:productId', async (req, res, next) => {
    const { name, image, icon, price, categories, description } = req.body
    const query = {}
    if (req.query.status) {
      query.status = req.query
    }
    const _id = req.params.productId
    try {
      const data = await service.Updateproduct({
        name,
        image,
        icon,
        price,
        categories,
        description,
        _id,
      })
      console.log(data)
      return res.send(data)
    } catch (err) {
      next(err)
    }
  })
}
