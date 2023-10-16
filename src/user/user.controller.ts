import { Request, Response } from "express"

import { UserService } from "./user.service"

const userService = new UserService()

export class UserController {
    async createUser(req: Request, res: Response){
        const { name, email , password} = req.body
        

        const user = await userService.createUser({ name, email, password })

        return res.json(user)
    }

    async getUser(req: Request, res: Response){
        const user_id = req.user_id

        const user = await userService.getUserInfo(user_id)

        return res.json(user)
    }
} 