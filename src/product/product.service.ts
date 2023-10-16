import prismaClient from "../prisma"

interface ProductRequest{
    name: string 
    price: string
    description: string
    banner: string
    category_id: string
}

interface ProductsRequest{
    category_id: string
}

export class ProductService{
    async createProductController({ name, price, description , banner, category_id}: ProductRequest){
        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id
            },
            select: {
                name: true,
                price: true,
                description: true,
                banner: true
            }

        })
        return product
    }

    async findProductsByCategory({ category_id }: ProductsRequest) {
        
        const produtcs = prismaClient.product.findMany({
            where: {
                category_id
            }
        })

        return produtcs
    }
}

