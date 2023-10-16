import { Request, Response } from "express";
import { ProductService } from "./product.service";

const productService = new ProductService

export class ProductController{

    async createProduct(req: Request, res: Response) {
        const { name, price , description, banner , category_id} = req.body

        if(!req.file){
            throw new Error("Send a image please!")
        } else {

            const { originalname, filename: banner } = req.file

            const product = await productService.createProductController({ 
                name,
                price,
                description,
                banner,
                category_id})
            
            return res.json(product)
        }
    }

    async findProductsByCategory(req: Request, res: Response){
        const category_id = req.query.category_id as string

        const products = await productService.findProductsByCategory({category_id})

        return res.json(products)
    }
}