import { Request, Response } from "express";

import { OrderService } from "./order.service";

const orderService = new OrderService

export class OrderController{
        async createOrder(req: Request, res: Response) {
            const { table , name } = req.body

            const order = await orderService.createOrder({
                table,
                name
            });

            return res.json(order)
        }

        async deleteOrder(req: Request, res: Response) {

            const order_id = req.query.order_id as string;

            const order = await orderService.deleteOrder({order_id})

            return res.json(order)
        }

        async addOnOrder(req: Request, res: Response) {

            const {order_id, product_id, amount} = req.body

            const order = await orderService.addOnOrder({amount, order_id, product_id})

            return res.json(order)
        }

        async deleteItem(req: Request, res: Response) {

            const item_id = req.query.item_id as string;

            const order = await orderService.deleteItem({item_id})

            return res.json(order)
        }

        async sendOrder(req: Request, res: Response) {

            const {order_id} = req.body

            const order = await orderService.sendOrder({order_id})

            return res.json(order)
        }

        
        async finishOrder(req: Request, res: Response) {

            const {order_id} = req.body

            const order = await orderService.finishOrder({order_id})

            return res.json(order)
        }

        async listOrders(req: Request, res: Response) {

            const order = await orderService.listOrders()

            return res.json(order)
        }

        async getDetail(req: Request, res: Response) {
            
            const order_id = req.query.order_id as string;

            const order = await orderService.getDetails({ order_id })

            return res.json(order)
        }

        

}
