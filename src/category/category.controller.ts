import { Request, Response } from "express"


import { CatergoryService } from "./category.service"

const categoryService = new CatergoryService()


export class CategoryController{
    async createCategory( req: Request, res: Response) {
        const { name } = req.body

        const category = await categoryService.createCategory({ name })

        return res.json(category)
    }

    async getCategories( req: Request, res: Response) {
        const categories = await categoryService.getAllCategories()

        return res.json(categories)
    }
}