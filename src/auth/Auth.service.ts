import prismaClient from "../prisma";
import { compareSync } from "bcryptjs";
import { UserService } from "../user/user.service";
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email:string;
    password:string;
}

export class AuthService{
    async login({email, password}: AuthRequest){
        const userService = new UserService()

        const user = await userService.findUserByEmail(email)

        if(!user) {
            throw new Error('Email or password incorrect')
        }

        const passwordMatch = compareSync(password, user.password)

        if(!passwordMatch) {
            throw new Error('Email or password incorrect')
        }


        const token = sign(
            {
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '7d'
        }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
        
    }
}