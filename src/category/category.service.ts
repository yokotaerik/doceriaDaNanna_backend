import prismaClient from "../prisma";

interface CategoryRequest {
    name: string,
}


export class CatergoryService {

    async createCategory({ name }: CategoryRequest) {

        if( name.length == 0){
            throw new Error('This name is invalid')
        }

        const alreadyExists = await this.findCategoryByName(name)

        if(alreadyExists){
            throw new Error('Category alerdy exists')
        }

        const category = await prismaClient.category.create({
            data: {
                name,

            },
            select: {
                id: true,
                name: true,
            }
        })

        return category
    }

    async findCategoryByName(name: string) {
        const category = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        return category
    }

    async getAllCategories() {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return categories
    }

}