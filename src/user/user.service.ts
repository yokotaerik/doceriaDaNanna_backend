import prismaClient from "../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    password: string;
    email: string;
}

export class UserService {

    async createUser({name, email, password}: UserRequest){
        if(!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await this.findUserByEmail(email)

        if(userAlreadyExists) {
            throw new Error("User alerdy exists")
        }

        let passwordHashed = await hash(password, 8)
        

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHashed,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user

    }

    async findUserByEmail(email: string) {
        const user = await prismaClient.user.findFirst({
            where:{
              email: email  
            }
          })

        return user
    }

    async getUserInfo(id: string) {
        const user = prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}