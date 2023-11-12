import { Router, Request , Response} from "express";
import multer from 'multer'

import uploadConfig from './config/multer'

import { UserController } from './user/user.controller'
import { AuthController } from "./auth/Auth.controller";

import { isAuthenthicated } from "./middlewares/isAuthenthicated";
import { CategoryController } from "./category/category.controller";
import { ProductController } from "./product/product.controller";
import { OrderController } from "./order/order.controller";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

router.post('/user', new UserController().createUser)
router.post('/login', new AuthController().login)
router.get('/me', isAuthenthicated, new UserController().getUser)



router.post('/category', isAuthenthicated, new CategoryController().createCategory)
router.get('/category', isAuthenthicated, new CategoryController().getCategories)



router.post('/product', isAuthenthicated, upload.single('file'), new ProductController().createProduct)
    router.get('/category/product', isAuthenthicated, upload.single('file'), new ProductController().findProductsByCategory)



router.post('/order', isAuthenthicated, new OrderController().createOrder)
router.delete('/order', isAuthenthicated, new OrderController().deleteOrder)
router.post('/order/add', new OrderController().addOnOrder)
router.delete('/order/delete', isAuthenthicated, new OrderController().deleteItem)
router.put('/order/send', isAuthenthicated, new OrderController().sendOrder)
router.put('/order/finish', isAuthenthicated, new OrderController().finishOrder)
router.get('/order', isAuthenthicated, new OrderController().listOrders)
router.get('/order/detail', isAuthenthicated, new OrderController().getDetail)




export { router }