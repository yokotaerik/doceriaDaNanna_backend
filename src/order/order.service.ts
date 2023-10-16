import prismaClient from "../prisma"

interface CreateOrderRequest{
    table: string;
    name: string;
}

interface OrderIdRequest{
    order_id: string;
}

interface addItemRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

interface removeItemRequest{
    item_id
}

export class OrderService{

    async createOrder({table, name}: CreateOrderRequest){

        const order = await prismaClient.order.create({
            data: {
                table,
                name,
            }
        })

        return order
    }
    
    async deleteOrder({order_id}: OrderIdRequest){

        const order = prismaClient.order.delete({
            where: {
                id: order_id
            }
        })
        
        return order
    }
    
    
    async sendOrder({ order_id }: OrderIdRequest) {
    
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                 draft: false
            }
            })

        return order
    }

    async finishOrder({ order_id }: OrderIdRequest) {
    
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                 status: true
            }
            })

        return order
    }



    async addOnOrder({ order_id,product_id,amount}:addItemRequest) {
        
        const order = await prismaClient.item.create({
            data: {
                order_id,
                product_id,
                amount
            }
        })

        return order    
    }

    async deleteItem({ item_id }: removeItemRequest) {

        const order = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        })
        
        return order
    }

    async listOrders() {

        const orders = await prismaClient.order.findMany({
            where: {
                status: false,
                draft: false
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return orders
    }

    async getDetails({ order_id }: OrderIdRequest){
        

        const orders = await prismaClient.item.findMany({
            where: {
                order_id
            },
            include:{
                product:true,
                order: true
            }
        })

        return orders
    }


}   