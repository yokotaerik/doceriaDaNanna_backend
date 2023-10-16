import { Request, Response } from "express"

import { AuthService } from "./Auth.service"

export class AuthController {
    async login(req: Request, res: Response){
    const { email , password} = req.body

    const authService = new AuthService()

    const user = await authService.login({ email, password })

    return res.json(user)
    }
} 